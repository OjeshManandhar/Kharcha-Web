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

module.exports = router;
