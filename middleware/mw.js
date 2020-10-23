const isLoggedIn = function(req, res, next) {
  if (!req.session.userId) {
    const error = 'Login First!!'
    res.redirect(`/login?error=${error}`);
  } else {
    next()
  }
}

module.exports = isLoggedIn;