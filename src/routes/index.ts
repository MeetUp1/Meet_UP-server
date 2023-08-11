import express from "express";

import users from "./users";
import meetings from "./meeting";

const router = express.Router();

router.use("/users", users);
router.use("/meetings", meetings);

export default router;
