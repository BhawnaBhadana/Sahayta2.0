import express from "express";
import Sos from "../models/sos.js";


const router = express.Router();

/* GET ALL SOS */
router.get("/", async (req, res) => {
  try {
    const sos = await Sos.find().sort({ createdAt: -1 });
    res.json({ success: true, sos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* CREATE SOS */
router.post("/", async (req, res) => {
  try {
    const {
      phone,
      emergency,
      description,
      latitude,
      longitude,
      address
    } = req.body;

    // ❌ strict validation hata diya
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Location required"
      });
    }

    const sos = await Sos.create({
      phone: phone || "NA",
      emergency: emergency || "general",
      description,
      latitude,
      longitude,
      address
    });

    res.status(201).json({
      success: true,
      message: "SOS created successfully",
      sos
    });

  } catch (err) {
    console.error("❌ SOS ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
