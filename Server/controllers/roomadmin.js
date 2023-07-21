const Room = require("../models/Room");

exports.getListRoom = (req, res, next) => {
  Room.find()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
