// utils
const { path } = require('./../utils/path');

module.exports.get404 = (req, res) => {
  res.status(404).render(path('404'), { title: 'Page Not Found' });
};
