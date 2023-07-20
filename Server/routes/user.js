const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/user", userController.userAccess);
router.use("/user", userController.checkLogin);
router.post("/user/logout", userController.logout);
module.exports = router;
