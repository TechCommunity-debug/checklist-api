import winston from 'winston';

import config from '@/config';

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

const transports: winston.transport[] = [];

if (config.ENV !== 'prod') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        align(),
        printf(({ timestamp, level, message, ...metadata }) => {
          let msg = `${timestamp} [${level}] : ${message} `;
          if (metadata) {
            msg += JSON.stringify(metadata);
          }
          return msg;
        }),
      ),
    }),
  );
}

const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports,
  silent: config.ENV === 'test', // Disable logging in test environment
});

export { logger };
