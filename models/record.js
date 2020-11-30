// database
const { sequelize, DataTypes } = require('./../database');

const Record = sequelize.define('record', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  /**
   * unique field for using it in recordTag
   * value = id + userId
   * needs to be calculated manually after creating ...
   * ... then updating the newly created record
   */
  _id: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    defaultValue: 'null'
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Debit', 'Credit'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Record;
