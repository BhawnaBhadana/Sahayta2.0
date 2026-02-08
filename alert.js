import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Alert", alertSchema);
