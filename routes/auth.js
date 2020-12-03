// packages
const express = require('express');

// controllers
const authController = require('./../controllers/auth');

const router = express.Router();

// GET
router.get('/login', authController.get.login);
router.get('/create-account', authController.get.createAccount);
router.get('/logout', authController.get.logout);

// POST
router.post('/login', authController.post.login);
router.post('/create-account', authController.post.createAccount);
router.post('/delete-account', authController.post.deleteAccount);
router.post('/change-password', authController.post.changePassword);

module.exports = router;
