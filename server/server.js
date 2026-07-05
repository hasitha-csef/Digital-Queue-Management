const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* ----------------------------
   SERVE FRONTEND (CLIENT FOLDER)
-----------------------------*/
app.use(express.static(path.join(__dirname, "client")));

/* ----------------------------
   HOME ROUTE (OPTIONAL BUT SAFE)
-----------------------------*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

/* ----------------------------
   IN-MEMORY QUEUE DATA
-----------------------------*/
let queue = [];
let tokenNumber = 1;

/* ----------------------------
   GENERATE TOKEN / JOIN QUEUE
-----------------------------*/
app.post("/api/join", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const token = {
    id: tokenNumber++,
    name,
    status: "waiting",
    time: new Date()
  };

  queue.push(token);

  res.json({
    message: "Token generated successfully",
    token
  });
});

/* ----------------------------
   GET FULL QUEUE
-----------------------------*/
app.get("/api/queue", (req, res) => {
  res.json(queue);
});

/* ----------------------------
   SERVE NEXT PATIENT
-----------------------------*/
app.get("/api/next", (req, res) => {
  if (queue.length === 0) {
    return res.json({ message: "Queue is empty" });
  }

  const next = queue.shift();
  next.status = "served";

  res.json({
    message: "Serving next patient",
    token: next
  });
});

/* ----------------------------
   RESET QUEUE (OPTIONAL)
-----------------------------*/
app.delete("/api/reset", (req, res) => {
  queue = [];
  tokenNumber = 1;

  res.json({ message: "Queue reset successful" });
});

/* ----------------------------
   RENDER PORT CONFIG
-----------------------------*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});