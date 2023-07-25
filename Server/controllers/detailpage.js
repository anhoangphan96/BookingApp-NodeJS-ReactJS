const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
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
            $lt: convertDateHandler(endDate),
          },
        },
        {
          dateEnd: {
            $gte: convertDateHandler(startDate),
            $lt: convertDateHandler(endDate),
          },
        },
        {
          dateStart: { $lt: convertDateHandler(startDate) },
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
      console.log(listRoomId);
      const roomsAvailable = listRoomId.map((room) => {
        const updateRoom = { ...room }._doc;
        console.log(updateRoom);
        console.log(listRoomBooked);
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
