const { Prizes, GachaHistory } = require('../../../models');

async function getPrizes() {
  return Prizes.find({});
}

async function getWinners() {
  return GachaHistory.find({ status: 'WIN' })
    .populate('prize_id', 'name')
    .sort({ created_at: -1 })
    .lean();
}

module.exports = {
  getPrizes,
  getWinners,
};
