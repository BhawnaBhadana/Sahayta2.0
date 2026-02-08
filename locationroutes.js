import express from "express";
import Location from "../models/location.js"; // create model if not exists

const router = express.Router();

/* TEST */
router.get("/", (req, res) => {
  res.json({ success: true, message: "Location API working" });
});

/* SAVE LOCATION */
router.post("/save", async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ success: false, message: "lat & lng required" });
    }

    const saved = await Location.create({ lat, lng });

    res.json({
      success: true,
      message: "Location saved",
      location: saved
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* GET ALL LOCATIONS */
router.get("/all", async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: locations.length,
      locations
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

