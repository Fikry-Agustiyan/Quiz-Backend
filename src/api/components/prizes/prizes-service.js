const prizesRepository = require('./prizes-repository');
const { maskName } = require('../../../utils/name-masker');

async function getPrizes() {
  return prizesRepository.getPrizes();
}

async function getWinners() {
  const winnersData = await prizesRepository.getWinners();

  return winnersData.map((winner) => ({
    username: maskName(winner.username),
    prize_name: winner.prize_id ? winner.prize_id.name : 'Unknown Prize',
    won_at: winner.created_at,
  }));
}

module.exports = {
  getPrizes,
  getWinners,
};
