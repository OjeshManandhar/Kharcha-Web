// packages
const express = require('express');

// utils
const path = require('./../utils/path');

const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path('views', 'tags', 'index.html'));
});

router.get('/add', (req, res) => {
  res.sendFile(path('views', 'tags', 'add.html'));
});

router.get('/list', (req, res) => {
  res.sendFile(path('views', 'tags', 'list.html'));
});

router.get('/search', (req, res) => {
  res.sendFile(path('views', 'tags', 'search.html'));
});

router.get('/delete', (req, res) => {
  res.sendFile(path('views', 'tags', 'delete.html'));
});

module.exports = router;
