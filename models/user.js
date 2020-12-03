// database
const { sequelize, DataTypes } = require('./../database');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
    validate: {
      len: [5, 30]
    }
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [8, 50]
    }
  }
});

module.exports = User;
