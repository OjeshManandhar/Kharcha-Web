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
    res.render(_path('list'), { title: 'List Records' });
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
    console.log('add record:', req.body);

    res.redirect('/records');
  },
  filter: (req, res) => {
    console.log('filter record:', req.body);

    res.redirect('/records');
  },
  edit: (req, res) => {
    console.log('edit record:', req.body);

    res.redirect('/records');
  },
  delete: (req, res) => {
    console.log('delete record:', req.body);

    res.redirect('/records');
  }
};
