const express = require("express");
const router = express.Router();
const meetingController = require("./controllers/meeting.Controller");

router.post("/new", meetingController.meeting);
router.patch("/:id/accept", meetingController.patchChangeTime);
router.patch("/:meetingId/rejected", meetingController.patchReject);
router.delete("/:meetingId", meetingController.deleteMeeting);

module.exports = router;
