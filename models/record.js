const records = [];

class Record {
  constructor(id, date, amount, type, tags, description) {
    //  create new record
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.type = type;
    this.tags = tags;
    this.description = description;

    records.push(this);
  }

  edit(id, date, amount, type, tags, description) {
    const newRecords = records.forEach(record => {
      if (record.id === id) {
        return {
          id,
          date,
          amount,
          type,
          tags,
          description
        };
      }

      return record;
    });

    records.splice(0, records.length);
    records.push(...newRecords);
  }

  static getNewId() {
    return records.length + 1;
  }

  static list() {
    return records;
  }

  static filter(criteria) {
    console.log('filter according to:', criteria);

    return records;
  }

  static delete(id) {
    const newRecords = records.filter(record => record.id !== id);

    records.splice(0, records.length);
    records.push(...newRecords);
  }
}
