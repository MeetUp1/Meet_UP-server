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
