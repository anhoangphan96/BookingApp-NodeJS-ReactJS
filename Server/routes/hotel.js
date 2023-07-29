const express = require("express");
const router = express.Router();
const hotelControllers = require("../controllers/hotel");
const checkAuthorControllers = require("../controllers/checkAuthor");

//Các route được gọi từ trang client
router.get("/listcity", hotelControllers.getListCity);
router.get("/listhoteltype", hotelControllers.getListHotelType);
router.get("/listhotel", hotelControllers.getListHotelTopRate);

//----3 route đầu user không check author vì user sẽ có thể vào homepage để xem listcity, listtypehotel, listhotel-toprate
// router.use(checkAuthorControllers.checkAuthorUser);

router.post("/search", hotelControllers.postSearchData);
router.get("/detail/:id", hotelControllers.getDetailData);

//Các route được gọi từ trang admin
router.use(checkAuthorControllers.checkAuthorAdmin);
router.get("/", hotelControllers.getListHotel);
router.post("/addhotel", hotelControllers.postAddHotel);
router.get("/updatehotel", hotelControllers.getHotelOne);
router.post("/updatehotel", hotelControllers.postUpdateHotel);
router.post("/deletehotel", hotelControllers.deleteOneHotel);
module.exports = router;
