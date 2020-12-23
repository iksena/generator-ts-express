import env from 'dotenv';

env.config();

export default {
  port: process.env.PORT || 3000,
  loggerOptions: {
    name: process.env.SERVICE_NAME || '<%= name %>',
    level: process.env.LOG_LEVEL || 'debug',
  },
  resources: {
    <%_ if (postgres) { _%>
    db: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    }
    <%_ } _%>
  }
};
