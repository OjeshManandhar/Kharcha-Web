// packages
const express = require('express');

// controllers
const tagsController = require('./../controllers/tags');

const router = express.Router();

// GET
router.get('/', tagsController.get.index);
router.get('/add', tagsController.get.add);
router.get('/list', tagsController.get.list);
router.get('/search', tagsController.get.search);
router.get('/edit', tagsController.get.edit);
router.get('/delete', tagsController.get.delete);

// POST
router.post('/add', tagsController.post.add);
router.post('/search', tagsController.post.search);
router.post('/edit', tagsController.post.edit);
router.post('/delete', tagsController.post.delete);

module.exports = router;
