import dotenv from 'dotenv';

import ms from 'ms';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.ENV,
  WHITELIST_ORIGINS: ['http://yourDomain'], // Whilelist your domain here.
  MONGO_URI: process.env.MONGO_URI,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,
  WHITELIST_ADMIN_MAILS: ['test1@gmail.com', 'test2@gmail.com'],
};

export default config;
