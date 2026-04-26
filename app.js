const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const message = process.env.APP_MESSAGE || "Hello from my Render Deployment App!";
  res.send(message);
});

app.get("/health", (req, res) => {
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
