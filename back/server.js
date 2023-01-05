require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const { SERVER_PORT } = process.env;

app.use(express.json());
app.use(cors());
app.use(express.static("front"));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../front/index.html"));
});

const { seed, addOpening, getPositions } = require("./controller");

app.post("/seed", seed);
app.post("/aOpening", addOpening);
app.get("/opening-positions/:openingName", getPositions);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
