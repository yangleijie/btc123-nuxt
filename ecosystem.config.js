module.exports = {
  name: 'BTC123-WEB',
  script: './server/index.js',
  // exec_mode: 'cluster',
  // instances: 2,
  env: {
    PORT: 7123,
    NODE_ENV: 'production'
  },
  log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
};
