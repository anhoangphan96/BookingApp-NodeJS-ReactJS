const express = require("express");
const router = express.Router();
const hotelAdminControllers = require("../controllers/hoteladmin");
router.get("/", hotelAdminControllers.getListHotel);
module.exports = router;
