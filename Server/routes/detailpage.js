const express = require("express");
const router = express.Router();

const detailController = require("../controllers/detailpage");

router.get("/:id", detailController.getDetailData);
module.exports = router;
