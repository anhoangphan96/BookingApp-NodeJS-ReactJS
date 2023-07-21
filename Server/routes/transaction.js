const express = require("express");
const transactionController = require("../controllers/transaction");
const router = express.Router();

router.get("/data", transactionController.getReserve);
router.post("/reserve", transactionController.postReserve);
router.get("/transadminlast8", transactionController.getTransAdminLastest8);
router.get("/transadmin", transactionController.getTransAdminLastest8);
module.exports = router;
