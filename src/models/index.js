const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

// Join the database connection string
const connectionString = new URL(config.database.connection);
connectionString.pathname += config.database.name;

mongoose.connect(`${connectionString.toString()}`);

const dbExports = {};

const db = mongoose.connection;
db.once('open', async () => {
  logger.info('Successfully connected to MongoDB');

  try {
    const { Prizes } = dbExports;
    if (Prizes) {
      const count = await Prizes.countDocuments();
      if (count === 0) {
        logger.info('Prizes collection is empty. Seeding initial prizes...');
        await Prizes.insertMany([
          { name: 'Emas 10g', max_quota: 1, current_quota: 1 },
          { name: 'Smartphone X', max_quota: 5, current_quota: 5 },
          { name: 'Smartwatch Y', max_quota: 10, current_quota: 10 },
          { name: 'Voucher 100k', max_quota: 100, current_quota: 100 },
          { name: 'Pulsa 50k', max_quota: 500, current_quota: 500 },
        ]);
        logger.info('Prizes seeded successfully!');
      }
    }
  } catch (error) {
    logger.error(error, 'Failed to seed initial prizes data');
  }
});

dbExports.db = db;

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(mongoose);
    dbExports[model.modelName] = model;
  });

module.exports = dbExports;
