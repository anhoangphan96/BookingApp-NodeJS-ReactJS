const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomadmin");
router.get("/", roomController.getListRoom);
router.post("/addroom", roomController.addNewRoom);
router.get("/updateroom", roomController.getOneRoom);
router.post("/updateroom", roomController.updateOneRoom);
router.post("/deleteroom", roomController.deleteOneRoom);
module.exports = router;
