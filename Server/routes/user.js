const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkAuthorControllers = require("../controllers/checkAuthor");

//--- 2 router login không cần check author, vì sau khi login session mới tạo sessionId gửi cookie cho client
router.post("/access", userController.userAccess);
router.post("/adminlogin", userController.loginAdmin);

//Các router trong phần clientapp
router.use(checkAuthorControllers.checkAuthorUser);
router.get("/checklogin", userController.checkLogin);
router.post("/logout", userController.logout);
router.get("/infor", userController.getUserData);

//router của phần admin
router.use(checkAuthorControllers.checkAuthorAdmin);
router.get("/checkloginadmin", userController.checkLoginAdmin);
router.get("/listuser", userController.getListUser);
router.post("/adminlogout", userController.logout);
router.post("/setadmin", userController.setToAdmin);

module.exports = router;
