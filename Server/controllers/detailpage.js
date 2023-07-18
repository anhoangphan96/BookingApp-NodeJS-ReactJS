const Hotel = require("../models/Hotel");
const mongoose = require("mongoose");
exports.getDetailData = (req, res, next) => {
  const idHotel = req.params.id;
  Hotel.findById(idHotel).then((result) => {
    res.status(200).json(result);
  });
};
