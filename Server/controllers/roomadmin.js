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
      const roomID = result._id.toString();
      return Hotel.findOneAndUpdate(
        { _id: hotelId },
        { $push: { rooms: roomID } },
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

exports.getOneRoom = (req, res, next) => {
  const roomId = req.query.id;
  Room.findById(roomId).then((result) => {
    res.status(200).json(result);
  });
};

exports.updateOneRoom = (req, res, next) => {
  const roomId = req.query.id;
  const titleUpdated = req.body.title;
  const priceUpdated = req.body.price;
  const maxPeopleUpdated = req.body.maxPeople;
  const descUpdated = req.body.desc;
  const roomNumbersUpdated = req.body.room;
  const hotelId = req.body.hotel; // Đối với phần hotelId này thì có thể sử dụng làm công cụ thêm 1 loại phòng mới vào khách sạn
  const roomDataUpdated = {
    title: titleUpdated,
    price: priceUpdated,
    maxPeople: maxPeopleUpdated,
    desc: descUpdated,
    roomNumbers: roomNumbersUpdated,
  };

  Room.findByIdAndUpdate(roomId, roomDataUpdated, { new: true })
    .then((result) => {
      if (hotelId) {
        const roomID = result._id.toString();
        return Hotel.findOneAndUpdate(
          { _id: hotelId },
          { $push: { rooms: roomID } },
          { new: true } // trả về bản ghi và kết quả mới update
        );
      } else return result;
    })
    .then((result) => {
      return res.status(200).json({ message: "Add room successfully!" });
    })
    .catch((err) => {
      console.log(err);
    });
};
