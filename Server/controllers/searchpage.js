const Hotel = require("../models/Hotel");
const Transaction = require("../models/Transaction");
exports.postSearchData = (req, res, next) => {
  const city = req.body.destination;
  const [startDate, endDate] = req.body.date.trim().split("-");
  const maxPeople = req.body.adult + req.body.children;
  const roomAmount = req.body.room;
  Promise.all(
    Hotel.find({ city: city }).populate("rooms"),
    Transaction.find({ dateStart: { $gte: new Date(startDate) } })
  )
    .then((result) => {
      const hotelMatch = result.filter((hotel) => {
        const roomCapacity = hotel.rooms.reduce(
          (totalRoom, room) => totalRoom + room.roomNumbers.length,
          0
        );
        const peopleCapacity = hotel.rooms.reduce(
          (totalPeople, room) =>
            totalPeople + room.maxPeople * room.roomNumbers.length,
          0
        );
        return roomCapacity >= roomAmount && peopleCapacity >= maxPeople;
      });
      return hotelMatch;
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
