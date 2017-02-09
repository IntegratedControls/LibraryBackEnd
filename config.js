

const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 7000
  },
  mongo: {
    url: process.env.MONGO_DB_URI
  }
};


module.exports = config;
