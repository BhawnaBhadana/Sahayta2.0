import mongoose from "mongoose";

const sosSchema = new mongoose.Schema(
  {
    phone: { type: String },
    emergency: { type: String },
    description: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    address: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Sos", sosSchema);
