const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.Controller");

router.post("/login", userController.loginUser);
router.patch("/:id", userController.patchOpenTime);
router.get("/:id", userController.getOpenTime);

module.exports = router;
