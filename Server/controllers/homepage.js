const Hotel = require("../models/Hotel");
let listHotel;
Hotel.find().then((result) => {
  listHotel = result;
});

exports.getListCity = (req, res, next) => {
  if (listHotel) {
    Hotel.distinct("city").then((result) => {
      const listCity = result.map((city) => {
        return {
          city: city,
          properties: listHotel.filter((hotel) => hotel.city === city).length,
        };
      });
      return res.status(200).json(listCity);
    });
  }
};

exports.getListHotelType = (req, res, next) => {
  if (listHotel) {
    Hotel.distinct("type").then((result) => {
      const listHotelType = result.map((type) => {
        return {
          type: `${type}s`,
          count: listHotel.filter((hotel) => hotel.type === type).length,
        };
      });
      return res.status(200).json(listHotelType);
    });
  }
};

exports.getListHotelTopRate = (req, res, next) => {
  if (listHotel) {
    const list3HotelTopRate = listHotel
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    return res.status(200).json(list3HotelTopRate);
  }
};
