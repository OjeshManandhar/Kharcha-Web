// database
const { sequelize, DataTypes } = require('./../database');

// model
const Tag = require('./tag');
const User = require('./user');
const Record = require('./record');

const RecordTag = sequelize.define('recordTag', {
  // userId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: User,
  //     key: 'id',
  //     onDelete: 'CASCADE',
  //     onUpdate: 'CASCADE'
  //   },
  //   primaryKey: true
  // },
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id'
    }
    // primaryKey: true
  },
  recordId: {
    type: DataTypes.INTEGER,
    references: {
      model: Record
      // key: 'id'
    }
    // primaryKey: true
  }
});

module.exports = RecordTag;
