import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { WebSocketServer } from "ws";


// Route imports
import authRoutes from "./routes/authroutes.js";
import sosRoutes from "./routes/sosroutes.js";
import locationRoutes from "./routes/locationroutes.js";
import resourceRoutes from "./routes/resourceroutes.js";
import alertRoutes from "./routes/alertroutes.js";

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARE
======================= */
/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 🔥 VERY IMPORTANT


// Request logger (debugging)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

/* =======================
   BASIC ROUTES
======================= */

// Root test
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Sahayta Backend is Running"
  });
});

// DB Health Check
app.get("/db-check", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Backend & MongoDB route reachable"
  });
});

/* =======================
   API ROUTES
======================= */

app.use("/api/auth", authRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/alerts", alertRoutes);


/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

/* =======================
   404 HANDLER (LAST)
======================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/* =======================
   SERVER + DATABASE
======================= */
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const server = app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });

    const wss = new WebSocketServer({ server });

    // make websocket accessible in controllers
    app.set("wss", wss);

    wss.on("connection", (ws) => {
      console.log("🟢 Client connected to Live Alerts");

      ws.on("close", () => {
        console.log("🔴 Client disconnected");
      });
    });

  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error.message);
  });
