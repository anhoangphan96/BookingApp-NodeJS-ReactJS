const express = require("express");
const transactionController = require("../controllers/transaction");
const router = express.Router();

router.get("/data", transactionController.getReserve);
router.post("/reserve", transactionController.postReserve);

module.exports = router;
