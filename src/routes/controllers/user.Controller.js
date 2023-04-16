const User = require("../../models/User");

exports.loginUser = async (req, res, next) => {
  const { id, name, picture, email } = req.body.user;

  if (!id || !name || !picture || !email) {
    return res.status(401).send({ message: "Invalid user" });
  }

  try {
    const user = await User.findOne({ id });

    if (!user) {
      user = await User.create({
        name,
        id,
        picture,
        email,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.patchOpenTime = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).send("User not found");
    }
    user.openTime = req.body.selectedDateTime;
    await user.save();
  } catch (err) {
    next(err);
  }
};

exports.getOpenTime = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).send("users not found");
    }
    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.patchChangeTime = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id });
    const selectTime = req.body.selectUserUTCTime;

    if (!user) {
      return res.status(404).send("User not found");
    }
    const userOpenTime = user.openTime;
    const newOpenTime = userOpenTime.filter(
      (userOpenTime) => userOpenTime !== selectTime,
    );

    user.openTime = newOpenTime;
    user.reservationTime = [...user.reservationTime, selectTime];
    await user.save();
  } catch (err) {
    next(err);
  }
};
