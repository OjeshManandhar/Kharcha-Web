// database
const { sequelize, DataTypes } = require('./../database');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  unserName: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  passowrd: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
});

module.exports = User;
