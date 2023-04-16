const meeting = require("../../models/Meeting");

exports.meeting = async (req, res, next) => {
  const { title, location, startTime, requester, requestee } = req.body;
  if (!title || !location || !startTime || !requester || !requestee) {
    return res.status(401).send({ message: "Invalid user" });
  }

  try {
    user = await meeting.create({
      title,
      location,
      startTime,
      requester,
      requestee,
      status: "pending",
    });
  } catch (err) {
    next(err);
  }
};
