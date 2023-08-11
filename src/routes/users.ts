import express from "express";
import * as userController from "./controllers/user.Controller";

const router = express.Router();

router.post("/login", userController.loginUser);
router.patch("/:id", userController.patchOpenTime);
router.patch("/:id/changeTime", userController.patchChangeTime);
router.get("/:id", userController.getOpenTime);
router.get("/", userController.getUsers);
router.get("/:id/meetings", userController.getMeetings);
router.get("/:id/meetings/accepted", userController.getAcceptedMeetings);
router.patch("/:userId/cancel", userController.patchCancelTime);
router.patch("/:id/checkTime", userController.patchCheckTime);
router.patch(
  "/:id/changeReservationTime",
  userController.patchCancelReservationTime,
);

export default router;
