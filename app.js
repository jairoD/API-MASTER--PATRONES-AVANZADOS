const http = require("http");
const app = require("./src/index");
const mongoose = require("mongoose");
const express = require("express");

const server = http.createServer(app);

server.listen(process.env.PORT || 3001, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});
