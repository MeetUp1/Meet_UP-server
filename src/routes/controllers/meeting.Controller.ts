import { Request, Response, NextFunction } from "express";
import Meeting from "../../models/Meeting";

export const meeting = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, location, startTime, requester, requestee } = req.body;
  if (!title || !location || !startTime || !requester || !requestee) {
    return res.status(401).send({ message: "Invalid user" });
  }

  try {
    await Meeting.create({
      title,
      location,
      startTime,
      requester,
      requestee,
      status: "pending",
    });
    res.status(200).json({ message: "successfully" });
  } catch (err) {
    next(err);
  }
};

export const patchChangeTime = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findOne({ _id: id });

    if (!meeting) {
      return res.status(404).send("Meeting not found");
    }

    meeting.status = "accepted";
    await meeting.save();
    res.status(200).json({ message: "successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteMeeting = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { meetingId } = req.params;

    await Meeting.findByIdAndDelete(meetingId);

    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const patchReject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { meetingId } = req.params;
    const { message } = req.body;
    const meeting = await Meeting.findOne({ _id: meetingId });

    if (!meeting) {
      return res.status(404).send("Meeting not found");
    }

    meeting.status = "rejected";
    meeting.message = message;
    await meeting.save();

    res.status(200).json({ message: "successfully" });
  } catch (err) {
    next(err);
  }
};
