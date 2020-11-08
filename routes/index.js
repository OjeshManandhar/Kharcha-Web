// packages
const express = require('express');

const path = require('./../utils/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/home');
});

router.get('/home', function (req, res, next) {
  res.sendFile(path('views', 'home.html'));
});

router.get('/records', function (req, res, next) {
  res.sendFile(path('views', 'records.html'));
});

module.exports = router;
