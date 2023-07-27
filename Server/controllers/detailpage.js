const Hotel = require("../models/Hotel");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const convertDateHandler = require("../utils/convertDate");
exports.getDetailData = (req, res, next) => {
  const idHotel = req.params.id;
  Hotel.findById(idHotel).then((result) => {
    res.status(200).json(result);
  });
};

exports.getRoomAvailable = (req, res, next) => {
  const idHotel = req.params.id;
  const [startDate, endDate] = req.query.dateRange.trim().split("-");
  Promise.all([
    Hotel.findById(idHotel).populate("rooms"),
    Transaction.find({
      hotel: idHotel,
      $or: [
        {
          dateStart: {
            $gte: convertDateHandler(startDate),
            $lte: convertDateHandler(endDate),
          },
        },
        {
          dateEnd: {
            $gte: convertDateHandler(startDate),
            $lte: convertDateHandler(endDate),
          },
        },
        {
          dateStart: { $lte: convertDateHandler(startDate) },
          dateEnd: { $gte: convertDateHandler(endDate) },
        },
      ],
    }),
  ])
    .then((result) => {
      const [hotel, transactions] = result;
      const listRoomBooked = [];
      transactions.forEach((trans) => {
        trans.room.forEach((room) => {
          if (!listRoomBooked.includes(room)) {
            listRoomBooked.push(room);
          }
        });
      });
      const listRoomId = hotel.rooms;
      const roomsAvailable = listRoomId.map((room) => {
        const updateRoom = { ...room }._doc;
        return {
          ...updateRoom,
          roomNumbers: updateRoom.roomNumbers.filter(
            (rnum) => !listRoomBooked.includes(rnum)
          ),
        };
      });
      res.status(200).json(roomsAvailable);
    })
    .catch((err) => console.log(err));
};

exports.getUserData = (req, res, next) => {
  const username = req.session.username;
  User.find({ username: username })
    .then((result) => {
      res.status(200).json({
        username: result[0].username,
        fullName: result[0].fullName,
        phoneNumber: result[0].phoneNumber,
        email: result[0].email,
      });
    })
    .catch((err) => console.log(err));
};
