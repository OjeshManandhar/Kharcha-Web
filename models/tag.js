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

// class Tag {
//   static delete(tagsList) {
//     let deleted = false;
//     const list = tagsList.split(',').map(tag => tag.trim());

//     list.forEach(tag => {
//       const index = tags.findIndex(t => t === tag);

//       if (index !== -1) {
//         deleted = true;
//         tags.splice(index, 1);
//       }
//     });

//     return deleted;
//   }

//   static getExistingTags(tagsList) {
//     if (tagsList === '') {
//       return [];
//     }

//     const list = tagsList.split(',').map(tag => tag.trim());
//     const foundTags = [];

//     list.forEach(tag => {
//       const found = tags.find(t => t === tag);

//       if (found) foundTags.push(tag);
//     });

//     return foundTags;
//   }
// }

// module.exports = Tag;
