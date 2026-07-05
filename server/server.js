const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/patientRoutes"));

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 QueueCare Backend is Running");
});

// Use Render's PORT or 5000 locally
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});