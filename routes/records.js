// packages
const { render } = require('ejs');
const express = require('express');

// utils
const { path } = require('./../utils/path');

function _path(...args) {
  return path('records', ...args);
}

const router = express.Router();

router.get('/', function (req, res) {
  res.render(_path('index'), { title: 'Records' });
});

router.get('/add', (req, res) => {
  res.render(_path('add'), { title: 'Add Record' });
});

router.get('/list', (req, res) => {
  res.render(_path('list'), { title: 'List Records' });
});

router.get('/filter', (req, res) => {
  res.render(_path('filter'), { title: 'Filter Records' });
});

router.get('/edit', (req, res) => {
  res.render(_path('edit'), { title: 'Edit Record' });
});

router.get('/delete', (req, res) => {
  res.render(_path('delete'), { title: 'Delete Record' });
});

router.post('/add', (req, res) => {
  console.log('add record:', req.body);

  res.redirect('/records');
});

router.post('/filter', (req, res) => {
  console.log('filter record:', req.body);

  res.redirect('/records');
});

router.post('/edit', (req, res) => {
  console.log('edit record:', req.body);

  res.redirect('/records');
});

router.post('/delete', (req, res) => {
  console.log('delete record:', req.body);

  res.redirect('/records');
});

module.exports = router;
