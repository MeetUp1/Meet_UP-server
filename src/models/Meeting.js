const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  requester: {
    type: Object,
    required: true,
  },
  requestee: {
    type: Object,
    required: true,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("Meeting", MeetingSchema);
