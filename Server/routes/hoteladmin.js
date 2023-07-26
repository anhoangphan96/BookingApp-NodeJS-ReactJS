const express = require("express");
const router = express.Router();
const hotelAdminControllers = require("../controllers/hoteladmin");
router.get("/", hotelAdminControllers.getListHotel);
router.post("/addhotel", hotelAdminControllers.postAddHotel);
router.get("/updatehotel", hotelAdminControllers.getHotelOne);
router.post("/updatehotel", hotelAdminControllers.postUpdateHotel);
router.post("/deletehotel", hotelAdminControllers.deleteOneHotel);
module.exports = router;
