const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// TEMP DATA (so sermons show immediately)
const sermons = [
  { id: 1, title: "Faith in God", content: "Trust in the Lord always" },
  { id: 2, title: "Victory in Jesus", content: "Victory belongs to Jesus" }
];

app.get("/sermons", (req, res) => {
  res.json(sermons);
});

app.listen(5000, () => console.log("Server running"));
