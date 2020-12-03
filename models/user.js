// database
const { sequelize, DataTypes } = require('./../database');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
    validate: {
      len: [5, 30]
    }
  },
  password: {
    // hashed password will be saved
    type: DataTypes.STRING(),
    allowNull: false,
    validate: {
      min: 50
    }
  }
});

module.exports = User;
