import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.ENV,
  WHITELIST_ORIGINS: ['http://yourDomain'], // Whilelist your domain here.
  MONGO_URI: process.env.MONGO_URI,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

export default config;
