const User = require("../models/User");

//Controller xử lý việc đăng ký hoặc đăng nhập của user ở trang client
exports.userAccess = (req, res, next) => {
  //Lấy data từ req.body đồng thời kiểm tra xem user có input đủ hay không nếu không sẽ trả về các lỗi yêu cầu user input
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

  //Nếu như không có lỗi và mode là đăng ký thì tiến hành đăng ký rồi trả về response thành công
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
          //Nếu user đăng ký bằng 1 user đã tồn tại trả lỗi 409
          res.status(409).json({ message: "This username has been existing" });
        }
      })
      .catch((err) => console.log(err));

    //Nếu mode là đăng nhập và không có lỗi thì tìm user và password tương ứng, nếu đúng thì lưu session data và trả về thông tin user
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
          //Nếu sai thông tin đăng nhập thì trả lỗi 401
        } else {
          res.status(401).json({
            message: "Your username or password is incorrect",
          });
        }
      })
      .catch((err) => console.log(err));
  } else { //Lỗi 400 user input không đủ field
    res.status(400).json(errorInput);
  }
};
//Checklogin của user(khi user quay lại trang mà session và cookie còn thời hạn) để lấy lại thông tin đăng nhập display ở frontend
exports.checkLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.status(200).json({
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
    });
  }
};

//Logout và xóa đi session đã tạo
exports.logout = (req, res, next) => {
  req.session.destroy((result) => {
    res.status(200).json({ message: "Log out succesfully" });
  });
};

//Lấy thông tin của 1 user bằng cách query vào mongodb 
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

//Check đăng nhập ở trang login của admin, lấy thông tin input và dò trong User collection
exports.loginAdmin = (req, res, next) => {
  const username = req.body.userName;
  const password = req.body.password;
  User.find({ username: username, password: password })
    .then((user) => {
      //Nếu user đúng thông tin thì lưu session để trả về cookie và trả về 1 số thông tin cho user lấy sử dụng ở frontend
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
        //Còn nếu không thì tùy tình trạng mà gửi lỗi, 400 user nhập sai, 401 user này không được vào trang admin
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

//Checklogin của admin khi admin vào lại trang mà cookie vẫn còn thời hạn
exports.checkLoginAdmin = (req, res, next) => {
  //Nếu như nhận đúng sessionId và check thông tin là admin cũng như đăng đăng nhập thì trả về thông tin cho user để sử dụng ở frontend
  if (req.session.isLoggedIn && req.session.isAdmin) {
    res.status(200).json({
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      isAdmin: req.session.isAdmin,
    });
  } else {
    //Nếu không thì trả lỗi 401 để frontend xử lý bắt user đăng nhập
    res.status(401).json({ message: "Unauthorized!" });
  }
};


//Lấy list user 
exports.getListUser = (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

//Logout admin xóa session
exports.logout = (req, res, next) => {
  req.session.destroy((result) => {
    res.status(200).json({ message: "Log out succesfully" });
  });
};


//Set 1 user thành admin
exports.setToAdmin = (req, res, next) => {
  const userId = req.body.userId;
  User.findByIdAndUpdate(userId, { isAdmin: true }, { new: true })
    .then((result) =>
      res.status(200).json({ message: "Set to Admin succesfully!" })
    )
    .catch((err) => console.log(err));
};
