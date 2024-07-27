import { Router } from "express";
import {
  createUser,
  loginUser,
  getUser,
  getLiveStreams,
  createViewerToken,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/createu").post(createUser);
router.route("/login").post(loginUser);
router.route("/getu").get(getUser);
router.route("/live").get(getLiveStreams);
router.route("/createvtoken/:hostId").post(createViewerToken);

export default router;
