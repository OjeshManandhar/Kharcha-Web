// utils
const { path } = require('./../utils/path');

function _path(...args) {
  return path('home', ...args);
}

module.exports.get = {
  index: (req, res) => {
    res.render(_path('index'), { title: 'Home' });
  },
  settings: (req, res) => {
    res.render(_path('settings'), { title: 'Settings' });
  },
  deleteAccount: (req, res) => {
    res.render(_path('deleteAccount'), { title: 'Delete Account' });
  },
  changePassword: (req, res) => {
    res.render(_path('changePassword'), { title: 'Change Password' });
  }
};
