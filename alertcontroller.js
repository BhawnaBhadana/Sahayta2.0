import Alert from "../models/alert.js";

export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch alerts"
    });
  }
};

export const addAlert = async (req, res) => {
  try {
    const { message, category, priority } = req.body;

    const alert = await Alert.create({
      message,
      category,
      priority
    });

    // 🔴 REAL-TIME PUSH
    const wss = req.app.get("wss");
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            type: "NEW_ALERT",
            payload: alert
          }));
        }
      });
    }

    res.status(201).json({
      success: true,
      alert
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating alert"
    });
  }
};
