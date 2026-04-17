const express = require('express');

const gacha = require('./components/gacha/gacha-route');
const prizes = require('./components/prizes/prizes-route');

module.exports = () => {
  const app = express.Router();

  gacha(app);
  prizes(app);

  return app;
};
