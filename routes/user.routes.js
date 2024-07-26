import { Router } from "express";
import {
  createUser,
  loginUser,
  getUser,
  getLiveStreams,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/createu").post(createUser);
router.route("/login").post(loginUser);
router.route("/getu").get(getUser);
router.route("/live").get(getLiveStreams);

export default router;
