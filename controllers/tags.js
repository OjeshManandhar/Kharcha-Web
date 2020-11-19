// utils
const { path } = require('./../utils/path');

function _path(...args) {
  return path('tags', ...args);
}

// GET
module.exports.get = {
  index: (req, res) => {
    res.render(_path('index'), { title: 'Tags' });
  },
  add: (req, res) => {
    res.render(_path('add'), { title: 'Add Tag' });
  },
  list: (req, res) => {
    res.render(_path('list'), { title: 'List Tags' });
  },
  search: (req, res) => {
    res.render(_path('search'), { title: 'Search Tag' });
  },
  edit: (req, res) => {
    res.render(_path('edit'), { title: 'Edit Tag' });
  },
  delete: (req, res) => {
    res.render(_path('delete'), { title: 'Delete Tag' });
  }
};

// POST
module.exports.post = {
  add: (req, res) => {
    console.log('add tag:', req.body);

    res.redirect('/tags');
  },
  search: (req, res) => {
    console.log('search tag:', req.body);

    res.redirect('/tags');
  },
  edit: (req, res) => {
    console.log('edit tag:', req.body);

    res.redirect('/tags');
  },
  delete: (req, res) => {
    console.log('delete tag:', req.body);

    res.redirect('/tags');
  }
};
