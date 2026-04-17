const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function roll(request, response, next) {
  try {
    let { username } = request.body;

    if (!username) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Username di perlukan');
    }

    username = username.toLowerCase();

    const result = await gachaService.rollGacha(username);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function history(request, response, next) {
  try {
    let { username } = request.params;

    username = username.toLowerCase();

    const historyData = await gachaService.getHistoryByUsername(username);

    return response.status(200).json(historyData);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  roll,
  history,
};
