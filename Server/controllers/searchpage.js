const Hotel = require("../models/Hotel");
const Transaction = require("../models/Transaction");
const convStringToDate = require("../utils/convertDate");

exports.postSearchData = (req, res, next) => {
  const city = req.body.destination;
  const [startDate, endDate] = req.body.date.trim().split("-");
  const maxPeople = req.body.adult + req.body.children;
  const roomAmount = req.body.room;
  Promise.all([
    Hotel.find({ city: city }).populate("rooms"),
    Transaction.find({
      $or: [
        {
          dateStart: {
            $gte: convStringToDate(startDate),
            $lt: convStringToDate(endDate),
          },
        },
        {
          dateEnd: {
            $gte: convStringToDate(startDate),
            $lt: convStringToDate(endDate),
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
      const [hotels, transactions] = result;

      const hotelMatch = hotels.filter((hotel) => {
        //Tim list room đã bị book trong khoảng ngày search
        const listRoomBooked = [];
        //Lọc qua các transaction tìm ra transaction có trùng id hotel kiểm tra phòng trong transaction có bị book chưa nếu rồi thì push vào array để lát loại trừ ra
        transactions.forEach((trans) => {
          if (trans.hotel.toString() === hotel._id.toString()) {
            trans.room.forEach((room) => {
              if (!listRoomBooked.includes(room)) {
                listRoomBooked.push(room);
              }
            });
          }
          return listRoomBooked;
        });
        //Tính capacity của room trong khoảng ngày nếu trong transaction có phòng đặt của hotel thì lấy tổng capacity - ra số đã đặt
        //Chỉ cần capacity không đáp ứng 1 ngày trong khoảng ngày search cũng là không đáp ứng điều kiện
        const roomCapacity =
          hotel.rooms.reduce((totalRoom, room) => {
            return totalRoom + room.roomNumbers.length;
          }, 0) - listRoomBooked.length;

        //Tính toán số người tối đa trong khoảng ngày search của khách sạn
        //dùng hàm reducer trả về totalPeople = tổng qua từng element lấy maxPeople của room * tổng số room còn lại chưa bị book
        const peopleCapacity = hotel.rooms.reduce((totalPeople, room) => {
          return (
            totalPeople +
            room.maxPeople *
              room.roomNumbers.filter(
                (roomnum) => !listRoomBooked.includes(roomnum)
              ).length
          );
        }, 0);

        return roomCapacity >= roomAmount && peopleCapacity >= maxPeople;
      });
      return hotelMatch;
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
