const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomadmin");
router.get("/", roomController.getListRoom);

module.exports = router;
