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
  const room = Room.find({ title: { $in: req.body.room } })
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
        rooms: result,
      });
      return newHotel.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Add new hotel successfully!" });
    })
    .catch((err) => console.log(err));
};
