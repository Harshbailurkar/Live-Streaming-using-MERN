import { Router } from "express";
import { createIngress } from "../controllers/ingress.controller.js";

const router = Router();

router.route("/Ingress").post(createIngress);

export default router;
