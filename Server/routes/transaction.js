const express = require("express");
const transactionController = require("../controllers/transaction");
const router = express.Router();

router.get("/data", transactionController.getReserve);
router.post("/reserve", transactionController.postReserve);
router.get("/transadmin", transactionController.getTransAdmin);
module.exports = router;
