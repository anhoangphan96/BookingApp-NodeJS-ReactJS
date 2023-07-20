const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

exports.postReserve = (req, res, next) => {
  console.log(req.body);
  const dateRangeArray = req.body.date.split("-");
  console.log(req.session.username);
  const newTransaction = new Transaction({
    user: req.session.username,
    hotel: req.body.hotelId,
    room: req.body.roomList,
    dateStart: dateRangeArray[0].trim(),
    dateEnd: dateRangeArray[1].trim(),
    price: req.body.totalPrice,
    payment: req.body.payMethod,
    status: "Booked",
  });
  newTransaction.save();
  res
    .status(200)
    .json({ message: "Transaction has been created successfully" });
};
