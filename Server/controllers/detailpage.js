const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const mongoose = require("mongoose");
exports.getDetailData = (req, res, next) => {
  const idHotel = req.params.id;
  Hotel.findById(idHotel).then((result) => {
    res.status(200).json(result);
  });
};

exports.getRoomAvailable = (req, res, next) => {
  const idHotel = req.params.id;
  const dateRange = req.query.dateRange;
  Hotel.findById(idHotel)
    .populate("rooms")
    .then((hotel) => {
      const rooms = hotel.rooms;
      res.status(200).json(rooms);
    })
    .catch((err) => console.log(err));
};
