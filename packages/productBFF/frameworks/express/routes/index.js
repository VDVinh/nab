const express = require('express');
const bodyParser = require('body-parser');

const { getProductsRoutes } = require('./products');

const initServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    req.ipAddress =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.userAgent = req.get('user-agent');
    next();
  });
  app.use('/products', getProductsRoutes);

  app.get('*', (req, res) => {
    return res.status(404).json({ error: 'not found' });
  });
  return app;
};

const runServer = ({ port }) => {
  const app = initServer();
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
};

module.exports = { runServer, initServer };
