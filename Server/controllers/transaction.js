const Transaction = require("../models/Transaction");
const dateFormat = require("../utils/convertDate");
exports.postReserve = (req, res, next) => {
  const dateRangeArray = req.body.date.split("-");

  const newTransaction = new Transaction({
    user: req.session.username,
    hotel: req.body.hotelId,
    room: req.body.roomList,
    dateStart: dateFormat(dateRangeArray[0].trim()),
    dateEnd: dateFormat(dateRangeArray[1].trim()),
    price: req.body.totalPrice,
    payment: req.body.payMethod,
    status: "Booked",
  });
  newTransaction.save();
  res
    .status(200)
    .json({ message: "Transaction has been created successfully" });
};

exports.getReserve = (req, res, next) => {
  const username = req.session.username;
  Transaction.find({ user: username })
    .populate("hotel", "name")
    .then((result) => res.status(200).json(result));
};

exports.getTransAdminLastest8 = (req, res, next) => {
  Transaction.find()
    .limit(8)
    .populate("hotel", "name")
    .then((result) => res.status(200).json(result));
};
exports.getTransAdminAll = (req, res, next) => {
  Transaction.find()
    .limit(8)
    .populate("hotel", "name")
    .then((result) => res.status(200).json(result));
};
