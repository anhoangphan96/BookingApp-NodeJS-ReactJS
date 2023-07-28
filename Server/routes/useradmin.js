const express = require("express");
const router = express.Router();
const useradminController = require("../controllers/useradmin");

router.get("/", useradminController.getListUser);
router.post("/login", useradminController.login);
router.post("/setadmin", useradminController.setToAdmin);
router.post("/logout", useradminController.postLogout);
module.exports = router;
