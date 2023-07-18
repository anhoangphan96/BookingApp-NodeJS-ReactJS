const User = require("../models/User");

exports.userAccess = (req, res, next) => {
  const username = req.body.userName;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const phone = req.body.phone;
  const email = req.body.email;
  const mode = req.query.mode;
  if (mode === "signup") {
    const newUser = new User({
      username: username,
      password: password,
      fullName: fullname,
      phoneNumber: phone,
      email: email,
      isAdmin: false,
    });
    newUser.save();
    res.status(200).json({ message: "Sign up successfully" });
  } else if (mode === "login") {
    User.find({ username: username, password: password })
      .then((user) => {
        if (user.length > 0) {
          req.session.isLoggedIn = true;
          req.session.username = username;
          return req.session.save((err) => {
            res
              .status(200)
              .json({
                isLoggedIn: req.session.isLoggedIn,
                username: req.session.username,
              })
              .end();
          });
        } else {
          res.status(400).json({
            message:
              "Your account does not exist. Please check your username or password",
          });
        }
      })
      .catch((err) => console.log(err));
  }
};
exports.checkLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.status(200).json({
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
    });
  }
};
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    res.status(200).json({ message: "Log out succesfully" });
  });
};
