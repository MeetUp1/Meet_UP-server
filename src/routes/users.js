const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.Controller");

router.post("/login", userController.loginUser);
router.patch("/:id", userController.patchOpenTime);
router.patch("/:id/changeTime", userController.patchChangeTime);
router.get("/:id", userController.getOpenTime);
router.get("/", userController.getUsers);

module.exports = router;
