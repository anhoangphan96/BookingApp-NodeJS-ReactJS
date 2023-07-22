const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

exports.getListHotel = (req, res, next) => {
  Hotel.find().then((result) => res.status(200).json(result));
};
exports.postAddHotel = (req, res, next) => {
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
};

exports.getHotelOne = (req, res, next) => {
  const hotelid = req.query.id;
  Hotel.findById(hotelid)
    .populate("rooms", "title")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.postUpdateHotel = (req, res, next) => {
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
      res.status(200).json({ message: "Add new hotel successfully!" });
    })
    .catch((err) => console.log(err));
};
