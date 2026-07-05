const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("🚀 Digital Queue Management System is live");
});


let queue = [];
let tokenNumber = 1;


app.post("/api/join", (req, res) => {
  const user = req.body.name;

  if (!user) {
    return res.status(400).json({ message: "Name is required" });
  }

  const token = {
    id: tokenNumber++,
    name: user,
    status: "waiting",
    time: new Date()
  };

  queue.push(token);

  res.json({
    message: "Token generated successfully",
    token
  });
});


app.get("/api/queue", (req, res) => {
  res.json(queue);
});


app.get("/api/next", (req, res) => {
  if (queue.length === 0) {
    return res.json({ message: "Queue is empty" });
  }

  const next = queue.shift();
  next.status = "served";

  res.json({
    message: "Serving next token",
    token: next
  });
});


app.delete("/api/reset", (req, res) => {
  queue = [];
  tokenNumber = 1;

  res.json({ message: "Queue reset successful" });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});