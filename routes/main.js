// packages
const express = require('express');

// controllers
const mainController = require('./../controllers/main');

const router = express.Router();

router.get('/', mainController.get.index);

router.get('/message', mainController.get.message);

module.exports = router;
