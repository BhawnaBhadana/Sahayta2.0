import express from "express";
import { getAlerts, addAlert } from "../controllers/alertcontroller.js";

const router = express.Router();

router.get("/", getAlerts);
router.post("/", addAlert);

export default router;
