import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  name: String,
  category: String,
  locationName: String, // "Patiala, Punjab"

  // ✅ GEO LOCATION (MANDATORY)
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  },

  status: String
});

// ✅ GEO INDEX (VERY IMPORTANT)
resourceSchema.index({ location: "2dsphere" });

export default mongoose.model("Resource", resourceSchema);
