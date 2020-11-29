// packages
const { Op } = require('sequelize');

// model
const { Tag, Record } = require('./../models');

// utils
const { path } = require('./../utils/path');

function _path(...args) {
  return path('records', ...args);
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

    let newRecord;

    Record.create({
      userId: req.user.id,
      _id: "doesn't matter what value is given",
      date,
      amount,
      type,
      description
    })
      .then(record => {
        // Making and adding _id
        record._id = `${record.userId}+${record.id}`;

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
              console.log("Couldn't create record completely. Deleted record")
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
  },
  filter: (req, res) => {
    console.log('filter record:', req.body);

    res.redirect('/records');
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

        // Filter tags which are present in db
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
  }
};
