module.exports = (db) =>
  db.model(
    'GachaHistory',
    db.Schema({
      username: String,
      prize_id: {
        type: db.Schema.Types.ObjectId,
        ref: 'Prizes',
      },
      status: String,
      created_at: {
        type: Date,
        default: Date.now,
      },
    })
  );
