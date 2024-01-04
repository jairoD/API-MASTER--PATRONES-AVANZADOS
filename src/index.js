const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api.routes");
const { notFoundMIDWR, errorMIDWR } = require("./middlewares/middlewares");
dotenv.config();

const uri = process.env.MONGO_DB_URI;
console.log(uri);
mongoose.connect(uri || "mongodb://127.0.0.1:27017/API-MASTER");
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("connected to mongodb");
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api-master", apiRoutes);

app.use(notFoundMIDWR);
app.use(errorMIDWR);

module.exports = app;
