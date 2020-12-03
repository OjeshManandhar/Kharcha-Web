// packages
const express = require('express');

// model
const { User } = require('./../models');

// controllers
const homeController = require('./../controllers/home');

// middleware
const isAuth = require('./../middleware/isAuth');

const router = express.Router();

router.use(isAuth);

router.get('/', homeController.get.index);
router.get('/settings', homeController.get.settings);
router.get('/delete-account', homeController.get.deleteAccount);
router.get('/change-password', homeController.get.changePassword);

module.exports = router;
