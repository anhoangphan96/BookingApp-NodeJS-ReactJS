const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkAuthorControllers = require("../controllers/checkAuthor");

//--- 2 router login không cần check author, vì sau khi login session mới tạo sessionId gửi cookie cho client
router.post("/access", userController.userAccess); //client đăng ký và đăng nhập
router.post("/adminlogin", userController.loginAdmin); //admin đăng nhập
//--- 2 router checklogin check cũng giống với phần check authorize nên không cần check authorize nhưng để lấy data chứ k gọi next()
router.get("/checklogin", userController.checkLogin); 
router.get("/checkloginadmin", userController.checkLoginAdmin);

//Các router trong phần clientapp: 
router.use(checkAuthorControllers.checkAuthorUser);
router.post("/logout", userController.logout);
router.get("/infor", userController.getUserData);

//router của phần admin: check author, lấy list user, log out, và hành động set 1 account thành admin
router.use(checkAuthorControllers.checkAuthorAdmin);
router.get("/listuser", userController.getListUser);
router.post("/adminlogout", userController.logout);
router.post("/setadmin", userController.setToAdmin);

module.exports = router;
