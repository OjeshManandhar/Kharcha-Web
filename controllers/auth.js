// packages
const bcrypt = require('bcryptjs');

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
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
      where: {
        username: username
      }
    })
      .then(user => {
        if (!user) {
          res.redirect(
            '/message?message=Username not found&backLink=/auth/login'
          );

          return;
        }

        bcrypt
          .compare(password, user.password)
          .then(passwordMatch => {
            if (passwordMatch === true) {
              req.session.userId = user.id;
              req.session.loggedIn = true;

              req.session.save(err => {
                if (err) {
                  console.log('Session save error:', err);
                  return;
                }

                res.redirect('/home');
              });
            } else {
              res.redirect(
                '/message?message=Incorrect password&backLink=/auth/login'
              );
            }
          })
          .catch(err => console.log('bcrypt compare error:', err));
      })
      .catch(err => console.log('User.findOne error:', err));
  },
  createAccount: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body['confirm-password'];

    if (password !== confirmPassword) {
      res.redirect(
        '/message?message=Password and Confirm Password must be same&backLink=/auth/create-account'
      );
      return;
    }

    User.findOne({
      where: {
        username: username
      }
    })
      .then(user => {
        if (user) {
          res.redirect(
            '/message?message=Username already exists&backLink=/auth/create-account'
          );

          return;
        }

        bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            return User.create({
              username: username,
              password: hashedPassword
            });
          })
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
            console.log('bcrypt or User.create err:', err);

            res.redirect(
              '/message?message=Could not create an account&backLink=/auth/create-account'
            );
          });
      })
      .catch(err => console.log('User.findOne error:', err));
    User.create({ userName: 'TestUser', password: 'test password' });
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
