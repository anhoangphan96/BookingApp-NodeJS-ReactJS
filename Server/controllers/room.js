const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Transaction = require("../models/Transaction");
const convertDateHandler = require("../utils/convertDate");
//Lấy toàn bộ room
exports.getListRoom = (req, res, next) => {
  Room.find()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
//Viết function để validate data input của người dùng cho cả hàm tạo và update hotel
const validate = (reqbody) => {
  const errorInput = {
    title: "",
    price: "",
    maxPeople: "",
    desc: "",
    room: "",
    hotel: "",
  };
  let hasError = false;
  for (let property in reqbody) {
    if (
      typeof reqbody[property] === "object" &&
      reqbody[property].length === 0
    ) {
      hasError = true;
      errorInput[
        property
      ] = `Please input at least one ${property.toLowerCase()}`;
    } else if (!reqbody[property]) {
      hasError = true;
      errorInput[property] = `Please input for ${property.toLowerCase()}`;
    }
  }
  return { hasError: hasError, errorInput: errorInput };
};

//thêm 1 room mới
exports.addNewRoom = (req, res, next) => {
  //Validate data input của user xem đủ field k
  const validateInput = validate(req.body);
  if (!validateInput.hasError) {
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
      //Sau khi tạo room thì phải thêm room vào khách sạn vừa chọn ở frontend
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
  } else {
    res.status(400).json(validateInput.errorInput);
  }
};
//Lấy thông tin của 1 room để display vào form
exports.getOneRoom = (req, res, next) => {
  const roomId = req.query.id;
  Room.findById(roomId).then((result) => {
    res.status(200).json(result);
  });
};

//Logic update 1 room
exports.updateOneRoom = (req, res, next) => {
  //Validate data input của user xem đủ field k, nếu đủ thì tiến hành update
  const validateInput = validate(req.body);

  //Ở phần update sẽ không có field hotel vì schema vốn dĩ không có hotel, và 1 room type có thể add vào nhiều hotel
  if (!validateInput.hasError) {
    const roomId = req.query.id;
    const titleUpdated = req.body.title;
    const priceUpdated = req.body.price;
    const maxPeopleUpdated = req.body.maxPeople;
    const descUpdated = req.body.desc;
    const roomNumbersUpdated = req.body.room;
    const roomDataUpdated = {
      title: titleUpdated,
      price: priceUpdated,
      maxPeople: maxPeopleUpdated,
      desc: descUpdated,
      roomNumbers: roomNumbersUpdated,
    };
    //Update room bằng data mới nhất
    Room.findByIdAndUpdate(roomId, roomDataUpdated, { new: true })
      .then((result) => {
        return res.status(200).json({ message: "Update room successfully!" });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(400).json(validateInput.errorInput);
  }
};
//Xóa đi 1 room với điều kiện room đó đang k bị book trong transaction
exports.deleteOneRoom = (req, res, next) => {
  const roomId = req.body.roomId;
  Hotel.find({ rooms: { $in: [roomId] } })
    .populate("rooms", "roomNumbers")
    .then((result) => {
      //map kết quả tìm kiếm thành array chứa các hotelId có chứa room đang bị xóa
      const hotelId = result.map((hotel) => hotel._id);
      //Lấy list number của room đang xóa,bất kỳ ksan nào cũng chưa room đang xóa nên lấy khách sạn thứ 0 để lấy roomsnumber
      const roomNumbers = result[0].rooms.find(
        (room) => room._id.toString() === roomId.toString()
      ).roomNumbers;

      //Tìm transaction: 1 transaction bất kỳ liên quan 1 trong các hotel ở trên trong trạng thái booked và checkin và có chứa roomnumber đang muốn xóa
      return Transaction.findOne({
        $and: [
          { hotel: { $in: [...hotelId] } },
          { status: { $in: ["Booked", "Checkin"] } },
          { room: { $in: [...roomNumbers] } },
        ],
      });
    })
    .then((result) => {
      //Nếu không có transaction liên quan đến hotel chứa room đang yêu cầu xóa thì tiến hành gọi method delete
      if (!result) {
        return Room.findByIdAndDelete(roomId);
      }
    })
    //Cuối cùng nếu xóa thành công thì sẽ có result của data xóa còn nếu ở khối trên không có hành động gì thì sẽ trả về undefine tức là không được xóa
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Delete succesfully" });
      } else {
        res.status(400).json({
          message: " Your room is being booked! Can not Delete this room",
        });
      }
    })
    .catch((err) => console.log(err));
};

//Lấy danh sách room còn trống để display cho user chọn khi book phòng
exports.getRoomAvailable = (req, res, next) => {
  const idHotel = req.query.id;
  const [startDate, endDate] = req.query.dateRange.trim().split("-");
  //Tìm ra hotel và transaction theo idhotel và trong khoảng ngày user chọn
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
    //Sau đó so sánh room trong hotel đang được chọn với room đã book trong transaction để loại ra
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
      //Trả về list room available để frontend xử lý display cho user
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
