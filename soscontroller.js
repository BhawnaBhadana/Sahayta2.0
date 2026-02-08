import SOS from "../models/SOS.js";

export const createSOS = async (req, res) => {
  try {
    const {
      phone,
      emergency,
      description,
      latitude,
      longitude,
      address
    } = req.body;

    // BASIC SAFETY CHECK
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Location required"
      });
    }

    const newSOS = new SOS({
      phone: phone || "NA",
      emergency: emergency || "general",
      description: description || "",
      latitude,
      longitude,
      address
    });

    await newSOS.save();

    res.status(201).json({
      success: true,
      message: "SOS created successfully",
      sos: newSOS
    });

  } catch (err) {
    console.error("❌ SOS ERROR:", err.message);

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
