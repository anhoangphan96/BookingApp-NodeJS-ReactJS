const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Tạo schema và export model của Hotel
const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  //Field này không có yêu cầu trong schema của đề bài nhưng trong database có và sẽ được lấy giá rẻ nhất trong list
  cheapestPrice: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  rooms: {
    type: [{ type: String, ref: "Room", required: true }],
    required: true,
  },
});
module.exports = mongoose.model("Hotel", hotelSchema);
