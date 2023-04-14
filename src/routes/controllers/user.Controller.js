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
    console.log(id);
    const user = await User.findOne({ id });
    console.log(user);
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
