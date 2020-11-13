// packages
const express = require('express');

// utils
const { path } = require('./../utils/path');

function _path(...args) {
  return path('tags', ...args);
}

const router = express.Router();

router.get('/', function (req, res) {
  res.render(_path('index'), { title: 'Tags' });
});

router.get('/add', (req, res) => {
  res.render(_path('add'), { title: 'Add Tag' });
});

router.get('/list', (req, res) => {
  res.render(_path('list'), { title: 'List Tags' });
});

router.get('/search', (req, res) => {
  res.render(_path('search'), { title: 'Search Tag' });
});

router.get('/edit', (req, res) => {
  res.render(_path('edit'), { title: 'Edit Tag' });
});

router.get('/delete', (req, res) => {
  res.render(_path('delete'), { title: 'Delete Tag' });
});

router.post('/add', (req, res) => {
  console.log('add tag:', req.body);

  res.redirect('/tags');
});

router.post('/search', (req, res) => {
  console.log('search tag:', req.body);

  res.redirect('/tags');
});

router.post('/edit', (req, res) => {
  console.log('edit tag:', req.body);

  res.redirect('/tags');
});

router.post('/delete', (req, res) => {
  console.log('delete tag:', req.body);

  res.redirect('/tags');
});

module.exports = router;
