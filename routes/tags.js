// packages
const express = require('express');

// utils
const { path } = require('./../utils/path');

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

router.post('/add', (req, res) => {
  console.log('add tag:', req.body);

  res.redirect('/tags');
});

router.post('/search', (req, res) => {
  console.log('search tag:', req.body);

  res.redirect('/tags');
});

router.post('/delete', (req, res) => {
  console.log('delete tag:', req.body);

  res.redirect('/tags');
});

module.exports = router;
