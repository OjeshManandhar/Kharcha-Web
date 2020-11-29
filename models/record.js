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
    type: DataTypes.DECIMAL(10, 2),
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

// const records = [];

// class Record {
//   save() {
//     /**
//      * Return value
//      * true => sucessfully added or edited
//      * false => failed
//      */
//     if (this.id) {
//       // existing record => editing
//       const index = records.findIndex(r => r.id === this.id);

//       if (index !== -1) {
//         records[index] = this;
//         return true;
//       }
//     } else {
//       // new record
//       this.id = records.length + 1;
//       records.unshift(this);
//       return true;
//     }

//     return false;
//   }

//   static list() {
//     return records;
//   }

//   static filter(criteria) {
//     console.log('filter according to:', criteria);

//     return records;
//   }

//   static delete(id) {
//     /**
//      * Return value
//      * true => sucessfully deleted
//      * false => failed
//      */
//     const index = records.findIndex(r => r.id === id);

//     if (index === -1) {
//       return false;
//     }

//     records.splice(index, 1);
//     return true;
//   }
// }
