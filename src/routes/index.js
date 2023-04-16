const express = require("express");
const router = express.Router();

const users = require("./users");
const meetings = require("./meeting");

router.use("/users", users);
router.use("/meetings", meetings);

module.exports = router;
