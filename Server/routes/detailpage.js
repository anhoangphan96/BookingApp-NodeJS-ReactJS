const express = require("express");
const router = express.Router();

const detailController = require("../controllers/detailpage");
router.get("/userinfor", detailController.getUserData);
router.get("/:id", detailController.getDetailData);
router.get("/:id/rooms/available", detailController.getRoomAvailable);
module.exports = router;
