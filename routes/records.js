// packages
const express = require('express');

// controllers
const recordsController = require('./../controllers/records');

const router = express.Router();

// GET
router.get('/', recordsController.get.index);
router.get('/add', recordsController.get.add);
router.get('/list', recordsController.get.list);
router.get('/filter', recordsController.get.filter);
router.get('/edit', recordsController.get.edit);
router.get('/delete', recordsController.get.delete);

//POST
router.post('/add', recordsController.post.add);
router.post('/filter', recordsController.post.filter);
router.post('/edit', recordsController.post.edit);
router.post('/delete', recordsController.post.delete);

module.exports = router;
