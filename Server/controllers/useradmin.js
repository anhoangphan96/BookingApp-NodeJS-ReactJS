const User = require("../models/User");

exports.getListUser = (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
exports.setToAdmin = (req, res, next) => {
  const userId = req.body.userId;
  User.findByIdAndUpdate(userId, { isAdmin: true }, { new: true })
    .then((result) =>
      res.status(200).json({ message: "Set to Admin succesfully!" })
    )
    .catch((err) => console.log(err));
};
exports.login = (req, res, next) => {
  const username = req.body.userName;
  const password = req.body.password;
  User.find({ username: username, password: password })
    .then((user) => {
      if (user.length > 0 && user[0].isAdmin) {
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
        if (user.length === 0) {
          res.status(400).json({
            message: "Your password or username is incorrect ",
          });
        } else if (!user[0].isAdmin) {
          res.status(400).json({
            message: "Your account do not have admin role",
          });
        }
      }
    })
    .catch((err) => console.log(err));
};
