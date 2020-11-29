// database
const { sequelize, DataTypes } = require('./../database');

const Tag = sequelize.define('tag', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  tag: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: 'userTag'
  }
});

module.exports = Tag;
