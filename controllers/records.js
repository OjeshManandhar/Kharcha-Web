// packages
const { Op } = require('sequelize');

// model
const { Tag, Record } = require('./../models');

// utils
const { path } = require('./../utils/path');

function _path(...args) {
  return path('records', ...args);
}

function queryGenerator(data) {
  // Convert to boolean for comparing
  if (!!(data.start && data.end)) {
    if (data.start === data.end) {
      return { [Op.eq]: data.start };
    }
    return { [Op.and]: [{ [Op.gte]: data.start }, { [Op.lte]: data.end }] };
  } else if (!!data.start) {
    return { [Op.gte]: data.start };
  } else if (!!data.end) {
    return { [Op.lte]: data.end };
  }

  return undefined;
}

function padWithZeroes(number) {
  let my_string = '' + number;

  while (my_string.length < 5) {
    my_string = '0' + my_string;
  }

  return my_string;
}

// GET
module.exports.get = {
  index: (req, res) => {
    res.render(_path('index'), { title: 'Records' });
  },
  add: (req, res) => {
    res.render(_path('add'), { title: 'Add Record' });
  },
  list: (req, res) => {
    req.user
      .getRecords({ include: Tag })
      .then(records => {
        const parsedRecords = records
          .map(r => {
            const record = r.toJSON();

            delete record.tags;
            delete record.createdAt;
            delete record.updatedAt;

            record.tags = r.tags.map(t => t.name);

            return record;
          })
          .reverse();

        res.render(_path('list'), {
          title: 'List Records',
          backLink: '/records',
          records: parsedRecords
        });
      })
      .catch(err => console.log('user.getRecords err:', err));
  },
  filter: (req, res) => {
    res.render(_path('filter'), { title: 'Filter Records' });
  },
  edit: (req, res) => {
    res.render(_path('edit'), { title: 'Edit Record' });
  },
  delete: (req, res) => {
    res.render(_path('delete'), { title: 'Delete Record' });
  }
};

//POST
module.exports.post = {
  add: (req, res) => {
    const { date, amount, type, tags, description } = req.body;
    const list = [];

    tags
      .split(',')
      // Remove whitespaces
      .map(tag => tag.trim())
      // Filter out invalid tags
      .filter(t => !(t.length < 3 || t.length > 20))
      // Remove duplicates
      .forEach(t => {
        if (!list.find(x => x.toLowerCase() === t.toLowerCase())) list.push(t);
      });

    Record.max('id', {
      where: {
        userId: req.user.id
      }
    })
      .then(maxId => {
        let newRecord;
        const newId = !maxId ? 1 : maxId + 1;
        console.log('id:', maxId, newId);

        Record.create({
          id: newId,
          userId: req.user.id,
          _id: 0,
          date,
          amount,
          type,
          description
        })
          .then(record => {
            // Making and adding _id
            record._id = parseInt(record.userId + padWithZeroes(record.id), 10);

            newRecord = record;

            return record.save();
          })
          .then(() => {
            // Filter tags which are present in db
            return req.user.getTags({
              where: {
                name: {
                  [Op.in]: list
                }
              }
            });
          })
          .then(tags => {
            // Add tags to record
            return newRecord.addTags(tags);
          })
          .then(() => {
            // Set tags sucess
            res.redirect('/message?message=Record created&backLink=/records');
          })
          .catch(err => {
            console.log("Couldn't create record:", err);

            // Delete record if it exists use newRecord
            if (newRecord) {
              newRecord
                .destroy()
                .then(() =>
                  console.log(
                    "Couldn't create record completely. Deleted record"
                  )
                )
                .catch(err =>
                  console.log(
                    "Couldn't create record completely. Couldn't delete record completely too"
                  )
                );
            }

            res.redirect(
              "/message?message=Coundn't create Record&backLink=/records/add"
            );
          });
      })
      .catch(err => console.log('Record.max error:', err));
  },
  filter: (req, res) => {
    // gc = givenCriteria
    const gc = {
      id: {
        start: req.body['id-start'],
        end: req.body['id-end']
      },
      date: {
        start: req.body['date-start'],
        end: req.body['date-end']
      },
      amount: {
        start: req.body['amount-start'],
        end: req.body['amount-end']
      },
      type: req.body.type,
      tagsType: req.body['tags-type'],
      tags: [],
      description: req.body.description,
      criteria: req.body.criteria
    };

    req.body.tags
      .split(',')
      // Remove whitespaces
      .map(tag => tag.trim())
      // Filter out invalid tags
      .filter(t => !(t.length < 3 || t.length > 20))
      // Remove duplicates
      .forEach(t => {
        if (!gc.tags.find(x => x.toLowerCase() === t.toLowerCase()))
          gc.tags.push(t);
      });

    req.user
      .getTags()
      .then(tags => {
        // Filter out tags which are no present in db
        gc.tags = gc.tags.filter(tag => tags.find(t => t.name === tag));

        let temp;
        const query = [];

        // id
        temp = queryGenerator(gc.id);
        if (temp) {
          query.push({ id: temp });
        }
        // date
        temp = queryGenerator(gc.date);
        if (temp) {
          query.push({ date: temp });
        }
        // amount
        temp = queryGenerator(gc.amount);
        if (temp) {
          query.push({ amount: temp });
        }
        // type
        if (gc.type !== 'any') {
          query.push({ type: gc.type });
        }

        // tag
        // if (gc.tags.length > 0) {
        //   query.push({ '$tags.name$': { [Op.in]: gc.tags } });
        // }

        // description
        if (gc.description) {
          query.push({ description: { [Op.like]: `%${gc.description}%` } });
        }

        req.user
          .getRecords({
            where: {
              ...(query.length > 0
                ? { [gc.criteria === 'any' ? Op.or : Op.and]: query }
                : {})
            },
            include: {
              model: Tag
            },
            through: {
              attributes: []
            }
          })
          .then(records => {
            /**
             * Will give records which has any tag
             * Filter for tags here
             */
            const parsedRecords = [];
            records.forEach(r => {
              const record = r.toJSON();

              delete record.createdAt;
              delete record.updatedAt;

              record.tags = r.tags.map(t => t.name);

              if (gc.tags.length > 0) {
                if (gc.tagsType === 'any') {
                  // Filter records which has any the required tags
                  if (gc.tags.some(tag => record.tags.find(t => t === tag))) {
                    parsedRecords.push(record);
                  }
                } else {
                  // Filter records which has all the required tags
                  if (gc.tags.every(tag => record.tags.find(t => t === tag))) {
                    parsedRecords.push(record);
                  }
                }
              } else {
                parsedRecords.push(record);
              }
            });

            parsedRecords.reverse();

            if (parsedRecords.length > 0) {
              res.render(_path('list'), {
                title: 'Filter Records',
                backLink: '/records',
                records: parsedRecords
              });
            } else {
              res.redirect(
                '/message?message=No records found&backLink=/records/filter'
              );
            }
          })
          .catch(err => console.log('user.getRecord err:', err));
      })
      .catch(err => console.log('user.getTags err:', err));
  },
  edit: (req, res) => {
    const { id, date, amount, type, tags, description } = req.body;
    const list = [];

    tags
      .split(',')
      // Remove whitespaces
      .map(tag => tag.trim())
      // Filter out invalid tags
      .filter(t => !(t.length < 3 || t.length > 20))
      // Remove duplicates
      .forEach(t => {
        if (!list.find(x => x.toLowerCase() === t.toLowerCase())) list.push(t);
      });

    req.user
      .getRecords({
        where: {
          id: id
        }
      })
      .then(records => {
        if (records.length === 0) {
          return Promise.resolve(undefined);
        }

        const newRecord = records[0];

        // Filter out tags which are no present in db
        req.user
          .getTags({
            where: {
              name: {
                [Op.in]: list
              }
            }
          })
          .then(tags => {
            // Set tags to record
            return newRecord.setTags(tags);
          })
          .then(() => {
            // Set tags sucess

            newRecord.date = date;
            newRecord.amount = amount;
            newRecord.type = type;
            newRecord.description = description;

            return newRecord.save();
          })
          .then(() => {
            // Save record sucess
            res.redirect('/message?message=Record edited&backLink=/records');
          })
          .catch(err => {
            console.log("Couldn't create record:", err);

            res.redirect(
              "/message?message=Coundn't edit Record&backLink=/records/edit"
            );
          });
      })
      .catch(err => console.log('user.getRecord err:', err));
  },
  delete: (req, res) => {
    console.log('record to delete:', req.body.id);

    req.user
      .getRecords({
        where: {
          id: req.body.id
        }
      })
      .then(records => {
        if (records.length === 0) {
          return Promise.resolve(undefined);
        }

        return records[0].destroy();
      })
      .then(destroied => {
        if (!destroied) {
          res.redirect(
            '/message?message=Record not found&backLink=/records/delete'
          );
        } else {
          res.redirect('/message?message=Record deleted&backLink=/records');
        }
      })
      .catch(err => console.log('user.getRecord err:', err));
  },
  detail: (req, res) => {
    const id = req.body.id;

    req.user
      .getRecords({
        where: {
          id: id
        },
        include: Tag
      })
      .then(records => {
        if (!records) {
          res.send({});
          return;
        }
        if (records.length !== 1) {
          res.send({});
          return;
        }

        const record = records[0].toJSON();

        record.tags = record.tags.map(t => t.name);

        // Remove un-necessary data
        delete record._id;
        delete record.userId;
        delete record.createdAt;
        delete record.updatedAt;

        res.send(record);
      })
      .catch(err => {
        console.log('user.getRecord err:', err);
        res.send({});
      });
  }
};
