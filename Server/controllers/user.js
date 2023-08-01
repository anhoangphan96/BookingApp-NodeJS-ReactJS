const User = require("../models/User");

exports.userAccess = (req, res, next) => {
  const username = req.body.userName;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const phone = req.body.phone;
  const email = req.body.email;
  const mode = req.query.mode;
  let noError = true;
  const errorInput = {
    userName: "",
    password: "",
    fullname: "",
    phone: "",
    email: "",
  };
  for (let data in req.body) {
    if (!req.body[data]) {
      noError = false;
      errorInput[data] = `Please input for ${data.toLocaleLowerCase()} field`;
    }
  }
  if (mode === "signup" && noError) {
    User.findOne({ username: username })
      .then((result) => {
        if (!result) {
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
        } else {
          res.status(409).json({ message: "This username has been existing" });
        }
      })
      .catch((err) => console.log(err));
  } else if (mode === "login" && noError) {
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
          res.status(401).json({
            message: "Your username or password is incorrect",
          });
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(400).json(errorInput);
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
  req.session.destroy((result) => {
    res.status(200).json({ message: "Log out succesfully" });
  });
};

exports.getUserData = (req, res, next) => {
  const username = req.session.username;
  User.find({ username: username })
    .then((result) => {
      res.status(200).json({
        username: result[0].username,
        fullName: result[0].fullName,
        phoneNumber: result[0].phoneNumber,
        email: result[0].email,
      });
    })
    .catch((err) => console.log(err));
};

exports.loginAdmin = (req, res, next) => {
  const username = req.body.userName;
  const password = req.body.password;
  User.find({ username: username, password: password })
    .then((user) => {
      if (user.length > 0 && user[0].isAdmin) {
        req.session.isLoggedIn = true;
        req.session.username = username;
        req.session.isAdmin = user[0].isAdmin;
        return req.session.save((err) => {
          res
            .status(200)
            .json({
              isLoggedIn: req.session.isLoggedIn,
              username: req.session.username,
              isAdmin: req.session.isAdmin,
            })
            .end();
        });
      } else {
        if (user.length === 0) {
          res.status(400).json({
            message: "Your password or username is incorrect ",
          });
        } else if (!user[0].isAdmin) {
          res.status(401).json({
            message: "Your account do not have admin role",
          });
        }
      }
    })
    .catch((err) => console.log(err));
};
exports.checkLoginAdmin = (req, res, next) => {
  if (req.session.isLoggedIn && req.session.isAdmin) {
    res.status(200).json({
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.status(401).json({ message: "Unauthorized!" });
  }
};
exports.getListUser = (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
exports.logout = (req, res, next) => {
  req.session.destroy((result) => {
    res.status(200).json({ message: "Log out succesfully" });
  });
};
exports.setToAdmin = (req, res, next) => {
  const userId = req.body.userId;
  User.findByIdAndUpdate(userId, { isAdmin: true }, { new: true })
    .then((result) =>
      res.status(200).json({ message: "Set to Admin succesfully!" })
    )
    .catch((err) => console.log(err));
};
