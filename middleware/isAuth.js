module.exports = (req, res, next) => {
  if (
    req.session.loggedIn &&
    req.session.userId &&
    req.user &&
    req.session.userId === req.user.id
  ) {
    next();
    return;
  }

  res.redirect('/auth/login');
};
