const Hotel = require("../models/Hotel");

exports.getListHotel = (req, res, next) => {
  Hotel.find().then((result) => res.status(200).json(result));
};
