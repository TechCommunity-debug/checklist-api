import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

import config from '@/config';
import limiter from '@/lib/express_rate_limit';

import type { CorsOptions } from 'cors';

const app = express();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.ENV === 'dev' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      console.log(`origin ${origin?.toString()}`);
      callback(null, true);
    } else {
      // reject requests for non-whitelisted requests
      callback(
        new Error(`CORS Error: ${origin} is not allowed by CORS.`),
        false,
      );
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
    app.get('/', (req, res) => {
      res.json({ message: 'Hello World!' });
    });

    app.listen(config.PORT, () => {
      console.log(`Server running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.log('Failed to start the server.', err);

    if (config.ENV === 'prod') {
      process.exit(1);
    }
  }
})();

export default app;
