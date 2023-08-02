const express = require("express");
const transactionController = require("../controllers/transaction");
const router = express.Router();
const checkAuthorControllers = require("../controllers/checkAuthor");

//Các route được gọi từ client app: tạo 1 transaction mới và lấy danh sách transaction theo account
router.use(checkAuthorControllers.checkAuthorUser);
router.get("/data", transactionController.getReserve);
router.post("/reserve", transactionController.postReserve);

//Các route được gọi từ admin app : lấy list transaction full và 8 trans mới nhất
router.use(checkAuthorControllers.checkAuthorAdmin);
router.get("/transadminlast8", transactionController.getTransAdminLastest8);
router.get("/transadmin", transactionController.getTransAdminAll);
module.exports = router;
