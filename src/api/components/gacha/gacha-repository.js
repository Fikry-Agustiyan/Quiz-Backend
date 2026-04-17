const { GachaHistory, Prizes } = require('../../../models');

async function countGachaToday(username, startOfDay, endOfDay) {
  return GachaHistory.countDocuments({
    username,
    created_at: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });
}

async function getPrizeByName(name) {
  return Prizes.findOne({ name });
}

async function claimPrize(prizeId) {
  return Prizes.findOneAndUpdate(
    { _id: prizeId, current_quota: { $gt: 0 } },
    { $inc: { current_quota: -1 } },
    { new: true }
  );
}

async function recordHistory(username, prizeId, status) {
  return GachaHistory.create({
    username,
    prize_id: prizeId,
    status,
  });
}

async function getHistoryByUsername(username) {
  return GachaHistory.find({ username })
    .populate('prize_id', 'name')
    .sort({ created_at: -1 })
    .lean();
}

module.exports = {
  countGachaToday,
  getPrizeByName,
  claimPrize,
  recordHistory,
  getHistoryByUsername,
};
