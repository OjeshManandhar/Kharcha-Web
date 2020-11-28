// database
const { sequelize, DataTypes } = require('./../database');

// model
const Tag = require('./tag');
const Record = require('./record');

const RecordTag = sequelize.define('recordTag', {
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id'
    }
  },
  recordId: {
    type: DataTypes.STRING(20),
    references: {
      model: Record,
      key: '_id'
    }
  }
});

module.exports = RecordTag;
