const express = require("express");
const router = express.Router();
const hotelControllers = require("../controllers/hotel");
const checkAuthorControllers = require("../controllers/checkAuthor");

//Các route được gọi từ trang client để lấy thông tin display cho homepage
router.get("/listcity", hotelControllers.getListCity);
router.get("/listhoteltype", hotelControllers.getListHotelType);
router.get("/listhotel", hotelControllers.getListHotelTopRate);

//----3 route đầu user không check author vì user sẽ có thể vào homepage để xem listcity, listtypehotel, listhotel-toprate
router.use(checkAuthorControllers.checkAuthorUser);
router.post("/search", hotelControllers.postSearchData); //Search hotel theo yêu cầu
router.get("/detail/:id", hotelControllers.getDetailData); // lấy chi tiết của 1 hotel

//Các route được gọi từ trang admin: thêm, chỉnh sửa, xóa 1 hotel, lấy list hotel
router.use(checkAuthorControllers.checkAuthorAdmin);
router.get("/", hotelControllers.getListHotel);
router.post("/addhotel", hotelControllers.postAddHotel);
router.get("/updatehotel", hotelControllers.getHotelOne);
router.post("/updatehotel", hotelControllers.postUpdateHotel);
router.post("/deletehotel", hotelControllers.deleteOneHotel);
module.exports = router;
