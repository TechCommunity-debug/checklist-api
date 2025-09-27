import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

import config from '@/config';
import limiter from '@/lib/express_rate_limit';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongoose';
import { logger } from '@/lib/winston';

import v1Routes from '@/routes/v1/index';

import type { CorsOptions } from 'cors';

const app = express();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.ENV === 'dev' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      // reject requests for non-whitelisted requests
      callback(
        new Error(`CORS Error: ${origin} is not allowed by CORS.`),
        false,
      );
      logger.warn(`CORS Error: ${origin} is not allowed by CORS.`);
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Enable response compression to reduce payload size and improve performance.
app.use(
  compression({
    threshold: 1024, // Only compress responses larger than 1KB.
  }),
);

// Use Helmet to enhance security by setting various HTTP headers.
app.use(helmet());

// Apply rate limiting middleware to prevent excessive requests and enhance security.
app.use(limiter);

(async () => {
  try {
    await connectToDatabase();

    app.use('/api/v1', v1Routes);

    app.listen(config.PORT, () => {
      logger.info(`Server running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start the server.', err);

    if (config.ENV === 'prod') {
      process.exit(1);
    }
  }
})();

export default app;

const handleServerShutDown = async () => {
  try {
    await disconnectFromDatabase();

    logger.warn('Server SHUTDOWN');
    process.exit(0);
  } catch (err) {
    logger.error('Error during server shutdown', err);
  }
};

process.on('SIGTERM', handleServerShutDown);
process.on('SIGINT', handleServerShutDown);
