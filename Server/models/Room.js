const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Schema và export model của Room
const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  roomNumbers: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
