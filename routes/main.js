// packages
const express = require('express');

// controllers
const mainController = require('./../controllers/main');

const router = express.Router();

router.get('/', mainController.getIndex);

router.get('/message', mainController.getMessage);

module.exports = router;
