const { Router } = require("express");
const userRoute = require("./users/user.route");
const taskRoute = require("./task/task.route");

const apiRoutes = Router();

apiRoutes.use("/user", userRoute);
apiRoutes.use("/task", taskRoute);

module.exports = apiRoutes;
