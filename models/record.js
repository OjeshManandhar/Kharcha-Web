// database
const { sequelize, DataTypes } = require('./../database');

const Record = sequelize.define('record', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
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
//   constructor(id, date, amount, type, tags, description) {
//     /**
//      * Creating new instance of arecord
//      * send id = null for adding a record
//      * send value of id for editing
//      */
//     this.id = id;
//     this.date = date;
//     this.amount = amount;
//     this.type = type;
//     this.tags = tags;
//     this.description = description;
//   }

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
