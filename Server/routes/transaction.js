const express = require("express");
const transactionController = require("../controllers/transaction");
const router = express.Router();

router.post("/reserve", transactionController.postReserve);

module.exports = router;
