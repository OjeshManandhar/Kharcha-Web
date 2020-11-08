// packages
const express = require('express');

// utils
const path = require('./../utils/path');

const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path('views', 'tags.html'));
});

router.get('/add', (req, res) => {
  res.send('Add Tag');
});

router.get('/list', (req, res) => {
  res.send('List Tags');
});

router.get('/search', (req, res) => {
  res.send('Search Tags');
});

router.get('/delete', (req, res) => {
  res.send('Delete Tag');
});

module.exports = router;
