const express = require('express');
const gachaController = require('./gacha-controller');

const router = express.Router();

module.exports = (app) => {
  app.use('/gacha', router);

  router.post('/roll', gachaController.roll);

  router.get('/history/:username', gachaController.history);
};
