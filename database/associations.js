// models
const { Tag, User, Record } = require('./../models');

module.exports = () => {
  /**
   * User and Tag => one-to-many
   * one User can create many Tag
   * i.e. User has many Tag or many Tag can belong to one User
   */
  User.hasMany(Tag, {
    onDelete: 'CASCADE',
    foreignKey: {
      unique: 'userTag'
    }
  });
  Tag.belongsTo(User);

  /**
   * User and Record => one-to-many
   * one User can create many Record
   * i.e. User has many Record or many Record can belong to one User
   */
  User.hasMany(Record, {
    onDelete: 'CASCADE',
    foreignKey: { primaryKey: true }
  });
  Record.belongsTo(User);

  /**
   * Record and Tag => many-to-many through Record_Tag
   * one Record can have many Tag and one Tag can belong to many Record
   */
  Record.belongsToMany(Tag, { through: 'recordTag', sourceKey: '_id' });
  Tag.belongsToMany(Record, { through: 'recordTag' });
};
