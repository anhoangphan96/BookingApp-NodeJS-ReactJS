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
