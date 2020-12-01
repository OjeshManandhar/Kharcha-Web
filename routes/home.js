// packages
const express = require('express');

// controllers
const homeController = require('./../controllers/home');

const router = express.Router();

router.get('/', homeController.get.index);
router.get('/settings', homeController.get.settings);
router.get('/delete-account', homeController.get.deleteAccount);
router.get('/change-password', homeController.get.changePassword);

module.exports = router;
