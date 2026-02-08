import express from "express";
import Resource from "../models/resource.js";

const router = express.Router();

/* GET ALL (with category filter) */
router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const resources = await Resource.find(filter);
    res.json(resources);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

/* CREATE */
router.post("/", async (req, res) => {
  const resource = await Resource.create(req.body);
  res.status(201).json({ success: true, resource });
});

export default router; // ✅ THIS WAS MISSING
