const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// TEMP DATA
const sermons = [
  { id: 1, title: "Faith in God", content: "Trust in the Lord always" },
  { id: 2, title: "Victory in Jesus", content: "Victory belongs to Jesus" }
];

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Church backend is running");
});

// SERMONS ROUTE
app.get("/sermons", (req, res) => {
  res.json(sermons);
});

// FIX FOR RENDER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));
