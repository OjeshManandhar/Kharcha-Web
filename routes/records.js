// packages
const express = require('express');

// utils
const { path } = require('./../utils/path');

const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path('views', 'records', 'index.html'));
});

router.get('/add', (req, res) => {
  res.sendFile(path('views', 'records', 'add.html'));
});

router.get('/list', (req, res) => {
  res.sendFile(path('views', 'records', 'list.html'));
});

router.get('/filter', (req, res) => {
  res.sendFile(path('views', 'records', 'filter.html'));
});

router.get('/delete', (req, res) => {
  res.sendFile(path('views', 'records', 'delete.html'));
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
