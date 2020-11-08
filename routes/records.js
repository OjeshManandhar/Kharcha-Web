// packages
const express = require('express');

// utils
const path = require('./../utils/path');

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

module.exports = router;
