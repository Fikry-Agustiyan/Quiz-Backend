const express = require('express');
const prizesController = require('./prizes-controller');

const router = express.Router();

module.exports = (app) => {
  app.use('/prizes', router);

  router.get('/', prizesController.getPrizes);

  router.get('/winners', prizesController.getWinners);
};
