const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomadmin");
router.get("/", roomController.getListRoom);
router.post("/addroom", roomController.addNewRoom);

module.exports = router;
