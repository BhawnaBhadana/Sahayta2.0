import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number
}, { timestamps: true });

export default mongoose.model("Location", locationSchema);
