import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.ENV,
  WHITELIST_ORIGINS: ['http://yourDomain'], // Whilelist your domain here.
};

export default config;
