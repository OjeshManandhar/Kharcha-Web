// packages
const express = require('express');

// utils
const { path } = require('./../utils/path');

const router = express.Router();

router.get('/', function (req, res) {
  res.render(path('records', 'index'), { title: 'Records' });
});

router.get('/add', (req, res) => {
  res.render(path('records', 'add'), { title: 'Add Record' });
});

router.get('/list', (req, res) => {
  res.render(path('records', 'list'), { title: 'List Records' });
});

router.get('/filter', (req, res) => {
  res.render(path('records', 'filter'), { title: 'Filter Records' });
});

router.get('/delete', (req, res) => {
  res.render(path('records', 'delete'), { title: 'Delete Record' });
});

router.post('/add', (req, res) => {
  console.log('add record:', req.body);

  res.redirect('/records');
});

router.post('/filter', (req, res) => {
  console.log('filter record:', req.body);

  res.redirect('/records');
});

router.post('/delete', (req, res) => {
  console.log('delete record:', req.body);

  res.redirect('/records');
});

module.exports = router;
