const express = require("express");
const router = express.Router();
const searchControllers = require("../controllers/searchpage");
router.post("/", searchControllers.postSearchData);
module.exports = router;
