const Transaction = require("../models/Transaction");
const dateFormat = require("../utils/convertDate");
exports.postReserve = (req, res, next) => {
  let error = "";
  let errorRoom = "";
  let hasError = false;
  //Trong request này chỉ cần check data rỗng ở listroom (array) và paymethod(string) theo logic sau
  for (let property in req.body) {
    if (property === "roomList" && req.body[property].length === 0) {
      hasError = true;
      errorRoom = " Please select at least one room";
    } else if (property === "payMethod" && !req.body[property]) {
      hasError = true;
      error = `Please input for ${property.toLowerCase()}`;
    }
  }

  //Kết hợp 2 lỗi lại thành 1
  error = error ? `${error}.${errorRoom}` : errorRoom;
  //Nếu không có lỗi thì lấy data từ body xử lý và gọi method tạo transaction mới, còn có lỗi thì trả status 400 kèm message
  if (!hasError) {
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
  } else {
    res.status(400).json(error);
  }
};

exports.getReserve = (req, res, next) => {
  const username = req.session.username;
  Transaction.find({ user: username })
    .populate("hotel", "name")
    .then((result) => res.status(200).json(result));
};

exports.getTransAdminLastest8 = (req, res, next) => {
  Transaction.find()
    .sort({ createdAt: -1 })
    .limit(8)
    .populate("hotel", "name")
    .then((result) => res.status(200).json(result));
};
exports.getTransAdminAll = (req, res, next) => {
  Transaction.find()
    .sort({ createdAt: -1 })
    .populate("hotel", "name")
    .then((result) => res.status(200).json(result));
};
