const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Transaction = require("../models/Transaction");
const convertDateHandler = require("../utils/convertDate");

//Lấy List city
exports.getListCity = (req, res, next) => {
  Promise.all([Hotel.distinct("city"), Hotel.find()]).then((result) => {
    //Tạo ra listcity gồm các giá trị city duy nhất trong database cùng với số khách sạn trong từng city
    const listCity = result[0].map((city) => {
      return {
        city: city,
        properties: result[1].filter((hotel) => hotel.city === city).length,
      };
    });
    return res.status(200).json(listCity);
  });
};
//Lấy list hotel type
exports.getListHotelType = (req, res, next) => {
  Promise.all([Hotel.distinct("type"), Hotel.find()]).then((result) => {
    //Tạo ra listtype gồm các giá trị type duy nhất trong database cùng với số khách sạn trong theo từng type
    const listHotelType = result[0].map((type) => {
      return {
        type: `${type}s`,
        count: result[1].filter((hotel) => hotel.type === type).length,
      };
    });
    return res.status(200).json(listHotelType);
  });
};
//Lấy ra 3 hotel có rate cao nhất
exports.getListHotelTopRate = (req, res, next) => {
  Hotel.find()
    .then((result) => {
      const list3HotelTopRate = result
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
      return res.status(200).json(list3HotelTopRate);
    })
    .catch((err) => console.log(err));
};

//Search để lấy khách sạn đáp ứng tiêu chí search
exports.postSearchData = (req, res, next) => {
  //logic xử lý khi user input không đủ data để search
  let error = "Please back to seach bar and input for";
  let hasError = false;
  for (let property in req.body) {
    //Nếu như data của các thuộc tính trong thanh search (trừ children) không được input thì sẽ trả về message lỗi
    if (!req.body[property] && property !== "children") {
      hasError = true;
      error = `${error} ${property.toLowerCase()},`;
    }
  }

  //Nếu như user input đủ thông tin và không có lỗi thì bắt đầu search
  if (!hasError) {
    const city = req.body.destination;
    const [startDate, endDate] = req.body.date.trim().split("-");
    const maxPeople = req.body.adult + req.body.children;
    const roomAmount = req.body.room;
    //Tìm ra hotel theo city yêu cầu, xem có trùng với các transaction đang book trong khoảng ngày yêu cầu không
    Promise.all([
      Hotel.find({ city: city }).populate("rooms"),
      Transaction.find({
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
  } else {
    res.status(400).json(error.slice(0, -1)); //slice ở đây để bỏ đi dấu phẩy ở cuối cùng
  }
};

//Lấy data chi tiết của 1 hotel
exports.getDetailData = (req, res, next) => {
  const idHotel = req.params.id;
  Hotel.findById(idHotel).then((result) => {
    res.status(200).json(result);
  });
};
//Lấy toàn bộ list hotel
exports.getListHotel = (req, res, next) => {
  Hotel.find().then((result) => res.status(200).json(result));
};
//Viết function để validate data input của người dùng cho cả hàm tạo và update hotel
const validate = (reqbody) => {
  const errorInput = {
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    picture: "",
    room: "",
  };
  let hasError = false;
  //Do có 2 loại data là String và Array nên chia ra 2 trường hợp để xử lý lỗi
  for (let property in errorInput) {
    if (
      typeof reqbody[property] === "object" &&
      reqbody[property].length === 0
    ) {
      hasError = true;
      errorInput[property] = `Please input at least one ${property}`;
    } else if (!reqbody[property]) {
      hasError = true;
      errorInput[property] = `Please input for ${property}`;
    }
  }
  return { hasError: hasError, errorInput: errorInput };
};

//Thêm mới 1 hotel
exports.postAddHotel = (req, res, next) => {
  //Validate data xem input đủ không nếu đủ thì tiếp tục k thì trả về lỗi 400
  const validateInput = validate(req.body);
  if (!validateInput.hasError) {
    const name = req.body.name;
    const type = req.body.type;
    const city = req.body.city;
    const address = req.body.address;
    const distance = req.body.distance;
    const title = req.body.title;
    const desc = req.body.desc;
    const price = req.body.price;
    const picture = req.body.picture;
    const featured = req.body.featured;
    //Tìm các Room mà user input (user bắt buộc phải thuộc title của các room) sau khi tìm ra thì tạo biến và gọi hàm tạo hotel, lưu vào database theo schema
    Room.find({ title: { $in: req.body.room } })
      .select("_id")
      .then((result) => {
        const newHotel = new Hotel({
          name: name,
          type: type,
          city: city,
          address: address,
          distance: distance,
          title: title,
          photos: picture,
          desc: desc,
          cheapestPrice: price,
          featured: featured,
          rooms: result.map((room) => room._id.toString()),
        });
        return newHotel.save();
      })
      .then((result) => {
        res.status(200).json({ message: "Add new hotel successfully!" });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(400).json(validateInput.errorInput);
  }
};

//Lấy data của 1 hotel để display ở form update
exports.getHotelOne = (req, res, next) => {
  const hotelid = req.query.id;
  Hotel.findById(hotelid)
    .populate("rooms", "title")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

//Update 1 hotel logic giống với logic tạo mới chỉ là dựa trên data mà user sửa lại
exports.postUpdateHotel = (req, res, next) => {
  const validateInput = validate(req.body);
  if (!validateInput.hasError) {
    const hotelId = req.query.id;
    const nameUpdated = req.body.name;
    const typeUpdated = req.body.type;
    const cityUpdated = req.body.city;
    const addressUpdated = req.body.address;
    const distanceUpdated = req.body.distance;
    const titleUpdated = req.body.title;
    const descUpdated = req.body.desc;
    const priceUpdated = req.body.price;
    const pictureUpdated = req.body.picture;
    const featuredUpdated = req.body.featured;
    Room.find({ title: { $in: req.body.room } })
      .select("_id")
      .then((result) => {
        const updatedHotel = {
          name: nameUpdated,
          type: typeUpdated,
          city: cityUpdated,
          address: addressUpdated,
          distance: distanceUpdated,
          title: titleUpdated,
          photos: pictureUpdated,
          photos: pictureUpdated,
          desc: descUpdated,
          cheapestPrice: priceUpdated,
          featured: featuredUpdated,
          rooms: result.map((room) => room._id.toString()),
        };
        return Hotel.findByIdAndUpdate(hotelId, updatedHotel, { new: true });
      })
      .then((result) => {
        res.status(200).json({ message: "Update hotel successfully!" });
      })
      .catch((err) => {});
  } else {
    res.status(400).json(validateInput.errorInput);
  }
};
//Xóa 1 hotel
exports.deleteOneHotel = (req, res, next) => {
  const hotelId = req.body.hotelId;
  //Tìm kiếm transaction đầu tiên có chứa hotel Id nếu có bất kỳ transaction nào liên quan đến hotel sẽ trả về lỗi báo không xóa được
  Transaction.findOne({ hotel: hotelId })
    .then((result) => {
      if (!result) {
        return Hotel.findByIdAndDelete(hotelId);
      }
    })
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ message: "Delete succesfully!, click Close to finish" });
      } else {
        res.status(400).json({
          message: "Can not Delete. Your Hotel is processed in Transaction",
        });
      }
    })
    .catch((err) => console.log(err));
};
