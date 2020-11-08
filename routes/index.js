// packages
const express = require('express');

// utils
const path = require('./../utils/path');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', function (req, res) {
  res.sendFile(path('views', 'home.html'));
});

router.get('/records', function (req, res) {
  res.sendFile(path('views', 'records.html'));
});

router.get('/tags', function (req, res) {
  res.sendFile(path('views', 'tags.html'));
});

module.exports = router;
