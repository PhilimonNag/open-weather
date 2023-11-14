const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const controller = require("./controller");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Jesus is with me");
});
app.get("/api/v1/weather/:city", controller);
app.listen(port, (err) => {
  if (err) {
    console.log(`Something went wrong`);
  } else {
    console.log(`Server is running at PORT:${port}`);
  }
});
