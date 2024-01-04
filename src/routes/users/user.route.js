const { Router } = require("express");
const { signup, signin } = require("../../controllers/user.controller");

const userRoute = Router();

userRoute.route("/signup").post(signup);
userRoute.route("/signin").post(signin);

userRoute.all("/", (req, res, next) => {
  res.send("users route");
});

module.exports = userRoute;
