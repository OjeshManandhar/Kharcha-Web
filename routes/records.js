// packages
const express = require('express');

// utils
const path = require('./../utils/path');

const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path('views', 'records.html'));
});

router.get('/add', (req, res) => {
  res.send('Add Record');
});

router.get('/list', (req, res) => {
  res.send('List Records');
});

router.get('/filter', (req, res) => {
  res.send('Filter Records');
});

router.get('/delete', (req, res) => {
  res.send('Delete Record');
});

module.exports = router;
