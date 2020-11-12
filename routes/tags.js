// packages
const express = require('express');

// utils
const { path } = require('./../utils/path');

const router = express.Router();

router.get('/', function (req, res) {
  res.render(path('tags', 'index'));
});

router.get('/add', (req, res) => {
  res.render(path('tags', 'add'));
});

router.get('/list', (req, res) => {
  res.render(path('tags', 'list'));
});

router.get('/search', (req, res) => {
  res.render(path('tags', 'search'));
});

router.get('/delete', (req, res) => {
  res.render(path('tags', 'delete'));
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
