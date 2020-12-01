// utiils
const { path } = require('./../utils/path');

function _path(...args) {
  return path('auth', ...args);
}

module.exports.get = {
  login: (req, res) => {
    res.render(_path('login'), { title: 'Log In' });
  },
  createAccount: (req, res) => {
    res.render(_path('createAccount'), { title: 'Create Account' });
  }
};

module.exports.post = {
  login: (req, res) => {
    console.log('post login:', req.body);

    res.redirect('/home');
  },
  createAccount: (req, res) => {
    console.log('post create:', req.body);

    res.redirect('/home');
  },
  changePassword: (req, res) => {
    console.log('post change:', req.body);

    res.redirect('/home');
  },
  deleteAccount: (req, res) => {
    console.log('post delete:', req.body);

    res.redirect('/home');
  }
};
