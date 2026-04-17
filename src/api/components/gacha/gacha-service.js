const gachaRepository = require('./gacha-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function rollGacha(username) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const rollCount = await gachaRepository.countGachaToday(
    username,
    today,
    tomorrow
  );

  if (rollCount >= 5) {
    throw errorResponder(
      errorTypes.UNPROCESSABLE_ENTITY,
      'User hanya bisa melakukan gacha 5 kali dalam sehari'
    );
  }

  const rand = Math.floor(Math.random() * 100) + 1;
  let targetPrizeName = null;

  if (rand <= 1) {
    targetPrizeName = 'Emas 10g';
  } else if (rand <= 4) {
    targetPrizeName = 'Smartphone X';
  } else if (rand <= 9) {
    targetPrizeName = 'Smartwatch Y';
  } else if (rand <= 24) {
    targetPrizeName = 'Voucher 100k';
  } else if (rand <= 54) {
    targetPrizeName = 'Pulsa 50k';
  }

  let status = 'LOSE';
  let prizeId = null;
  let prizeWon = null;

  if (targetPrizeName) {
    const prizeInfo = await gachaRepository.getPrizeByName(targetPrizeName);

    if (prizeInfo) {
      const claimed = await gachaRepository.claimPrize(prizeInfo.id);

      if (claimed) {
        status = 'WIN';
        prizeId = claimed.id;
        prizeWon = claimed;
      }
    }
  }

  await gachaRepository.recordHistory(username, prizeId, status);

  if (status === 'WIN') {
    return {
      message: 'Selamat! Anda memenangkan hadiah berikut:',
      prize: prizeWon.name,
    };
  }

  return { message: 'Anda tidak memenangkan hadiah apa-apa.' };
}

async function getHistoryByUsername(username) {
  const histories = await gachaRepository.getHistoryByUsername(username);

  return histories.map((history) => ({
    id: history.id,
    username: history.username,
    prize: history.prize_id ? history.prize_id.name : null,
    status: history.status,
    date: history.created_at,
  }));
}

module.exports = {
  rollGacha,
  getHistoryByUsername,
};
