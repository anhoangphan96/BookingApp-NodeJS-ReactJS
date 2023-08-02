const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");
const checkAuthorControllers = require("../controllers/checkAuthor");

//Các router sử dụng ở trang client: Lấy list room còn trống trong phần hotel detail
router.use(checkAuthorControllers.checkAuthorUser);
router.get("/available", roomController.getRoomAvailable);

//Các router sử dụng ở trang admin: thêm, xóa, update, lấy thông tin của 1 room, lấy list room
router.use(checkAuthorControllers.checkAuthorAdmin);
router.get("/", roomController.getListRoom);
router.post("/addroom", roomController.addNewRoom);
router.get("/updateroom", roomController.getOneRoom);
router.post("/updateroom", roomController.updateOneRoom);
router.post("/deleteroom", roomController.deleteOneRoom);
module.exports = router;
