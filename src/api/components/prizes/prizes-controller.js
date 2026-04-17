const prizesService = require('./prizes-service');

async function getPrizes(request, response, next) {
  try {
    const prizes = await prizesService.getPrizes();

    return response.status(200).json(prizes);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await prizesService.getWinners();

    return response.status(200).json(winners);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getPrizes,
  getWinners,
};
