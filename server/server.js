const express = require("express");
const cors = require("cors");
const path = require("path");
const connectedDB = require("./config/db");
const routes = require("./routes");

const app = express();
//db connect
connectedDB();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//cors
app.use(cors());
//headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
//api
app.use("/api", routes);
//static resources
app.use("/upload", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../client/build")));
app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
  } catch (e) {
    res.send("Welcome to stackoverflow clone");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server running");
});
