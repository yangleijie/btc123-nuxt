module.exports = {
  name: 'BTC123-WEB-QA',
  script: './server/index.js',
  // exec_mode: 'cluster',
  // instances: 2,
  env: {
    PORT: 7124,
    NODE_ENV: 'qa'
  },
  log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
};
