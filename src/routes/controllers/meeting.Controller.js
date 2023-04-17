const Meeting = require("../../models/Meeting");

exports.meeting = async (req, res, next) => {
  const { title, location, startTime, requester, requestee } = req.body;
  if (!title || !location || !startTime || !requester || !requestee) {
    return res.status(401).send({ message: "Invalid user" });
  }

  try {
    user = await Meeting.create({
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

exports.patchChangeTime = async (req, res, next) => {
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

exports.deleteMeeting = async (req, res, next) => {
  try {
    const { meetingId } = req.params;

    await Meeting.findByIdAndDelete(meetingId);

    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.patchReject = async (req, res, next) => {
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
