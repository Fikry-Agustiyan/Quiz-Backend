module.exports = (db) =>
  db.model(
    'Prizes',
    db.Schema({
      name: String,
      max_quota: Number,
      current_quota: Number,
    })
  );
