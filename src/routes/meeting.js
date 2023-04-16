const express = require("express");
const router = express.Router();
const meetingController = require("./controllers/meeting.Controller");

router.post("/new", meetingController.meeting);

module.exports = router;
