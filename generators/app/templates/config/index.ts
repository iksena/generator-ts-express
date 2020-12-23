import env from 'dotenv';

env.config();

export default {
  port: process.env.PORT || 3000,
  loggerOptions: {
    name: process.env.SERVICE_NAME || '<%= name %>',
    level: process.env.LOG_LEVEL || 'debug',
  },
};
