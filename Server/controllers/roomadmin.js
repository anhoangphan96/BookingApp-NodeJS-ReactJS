const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

exports.getListRoom = (req, res, next) => {
  Room.find()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
exports.addNewRoom = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const maxPeople = req.body.maxPeople;
  const desc = req.body.desc;
  const roomNumbers = req.body.room;
  const hotelId = req.body.hotel;
  const newRoom = new Room({
    title: title,
    price: price,
    maxPeople: maxPeople,
    desc: desc,
    roomNumbers: roomNumbers,
  });
  newRoom
    .save()
    .then((result) => {
      return Hotel.findOneAndUpdate(
        { _id: hotelId },
        { $push: { rooms: result._id } },
        { new: true } // trả về bản ghi và kết quả mới update
      );
    })
    .then((result) => {
      return res.status(200).json({ message: "Add room successfully!" });
    })
    .catch((err) => {
      console.log(err);
    });
};
