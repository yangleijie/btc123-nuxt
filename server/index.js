const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.set('port', port);

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV === 'development';

const redirects = [
  { from: '/yanxuan', to: '/' },
  { from: '/yanxuan/:id', to: '/' },
  { from: '/appDownload', to: '/download' },
  { from: '/market', to: '/currency' },
  { from: '/market/CoinDetails/:id', to: '/currency' },
  { from: '/market/range', to: '/currency' },
  { from: '/market/buy', to: '/currency' },
  { from: '/market/:id', to: '/exchange' },
  { from: '/market/buypt/:id', to: '/exchange' },
  { from: '/news/flash', to: '/flash' },
  { from: '/news/detail', to: '/news' },
  { from: '/news/newsDetail', to: '/news' },
  { from: '/news/newsDetails', to: '/news' },
  { from: '/news/newsDetails/:id', to: '/news' },
  { from: '/aboutus/1', to: '/about/copyright' },
  { from: '/aboutus/2', to: '/about' },
  { from: '/aboutus/3', to: '/about/contact' },
  { from: '/aboutus/4', to: '/about/feedback' },
  { from: '/common/login', to: '/signin' }
];

const apis = ['/api', '/api/:id', '/trades', '/trades/:id'];

async function start() {
  // 301-redirects
  redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
    app[method](from, (req, res) => {
      res.redirect(type, to);
    });
  });

  apis.forEach(key => {
    app.use(key, (req, res) => {
      res.json({ message: 'Not found' });
    });
  });

  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://127.0.0.1:${port}`,
    badge: true
  });
}
start();
