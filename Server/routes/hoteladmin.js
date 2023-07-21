const express = require("express");
const router = express.Router();
const hotelAdminControllers = require("../controllers/hoteladmin");
router.get("/", hotelAdminControllers.getListHotel);
router.post("/addhotel", hotelAdminControllers.postAddHotel);
module.exports = router;
