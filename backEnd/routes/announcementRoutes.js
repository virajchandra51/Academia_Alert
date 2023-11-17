const express = require("express");
const announcementController = require("./../controllers/announcementController");
const router = express.Router();

router.post("/createNew", announcementController.createNew);
module.exports = router;
