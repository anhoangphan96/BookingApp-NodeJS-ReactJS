const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage");
router.get("/listcity", homepageController.getListCity);
router.get("/listhoteltype", homepageController.getListHotelType);
router.get("/listhotel", homepageController.getListHotelTopRate);

module.exports = router;
