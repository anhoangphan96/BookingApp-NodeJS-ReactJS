const User = require("../models/User");

exports.checkAuthorUser = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
//CheckAuthor của admin sau khi đăng nhập thì phải có isAdmin true
exports.checkAuthorAdmin = (req, res, next) => {
  User.findOne({
    username: req.session.username,
    isAdmin: req.session.isAdmin,
  }).then((result) => {
    if (result) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
};
