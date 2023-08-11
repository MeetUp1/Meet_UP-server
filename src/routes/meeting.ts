import express from "express";
import * as meetingController from "./controllers/meeting.Controller";

const router = express.Router();

router.post("/new", meetingController.meeting);
router.patch("/:id/accept", meetingController.patchChangeTime);
router.patch("/:meetingId/rejected", meetingController.patchReject);
router.delete("/:meetingId", meetingController.deleteMeeting);

export default router;
