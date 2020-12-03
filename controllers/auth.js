// model
const { User } = require('./../models');

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
  },
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.log('Logout error:', err);
        res.redirect("/message/message=Couldn't Log out&backLink=/home");
        return;
      }

      res.redirect('/');
    });
  }
};

module.exports.post = {
  login: (req, res) => {
    console.log('post login:', req.body);

    User.findByPk(1)
      .then(user => {
        req.session.userId = user.id;
        req.session.loggedIn = true;

        req.session.save(err => {
          if (err) {
            console.log('Session save error:', err);
            return;
          }

          res.redirect('/home');
        });
      })
      .catch(err => {
        console.log('Invalid user:', err);
      });
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
