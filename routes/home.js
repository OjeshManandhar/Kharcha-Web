// packages
const express = require('express');

// model
const { User } = require('./../models');

// controllers
const homeController = require('./../controllers/home');

const router = express.Router();

router.use((req, res, next) => {
  if (!(req.session.loggedIn && req.session.userId)) {
    res.redirect('/');
    return;
  }

  User.findByPk(req.session.userId)
    .then(() => next())
    .catch(err => {
      console.log('Wser.findByPk home error:', err);

      res.redirect('/');
    });
});

router.get('/', homeController.get.index);
router.get('/settings', homeController.get.settings);
router.get('/delete-account', homeController.get.deleteAccount);
router.get('/change-password', homeController.get.changePassword);

module.exports = router;
