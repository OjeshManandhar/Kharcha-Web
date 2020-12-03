// utils
const { path } = require('./../utils/path');

module.exports.getIndex = (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }

  res.render(path('index'), { title: 'Kharcha' });
};

module.exports.getHome = (req, res) => {
  res.render(path('home'), { title: 'Home' });
};

module.exports.getMessage = (req, res) => {
  const message = req.query.message;
  const backLink = req.query.backLink;

  if (!message || !backLink || message === '' || backLink === '') {
    console.log('Incorrect message query');
    res.redirect('/');

    return;
  }

  res.render(path('message'), { title: 'Message', message, backLink });
};
