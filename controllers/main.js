// utils
const { path } = require('./../utils/path');

module.exports.getIndex = (req, res) => {
  res.redirect('/home');
};

module.exports.getHome = (req, res) => {
  res.render(path('home'), { title: 'Home' });
};

module.exports.getMessage = (req, res) => {
  const message = req.query.message;
  const backLink = req.query.backLink;

  console.log('message:', message);
  console.log('backLink:', backLink);

  if (!message || !backLink || message === '' || backLink === '') {
    console.log('Incorrect query');
    res.redirect('/');

    return;
  }

  res.redirect('/');
};
