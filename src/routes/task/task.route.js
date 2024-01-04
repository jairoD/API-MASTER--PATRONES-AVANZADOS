const { Router } = require("express");
const { auth, owner } = require("../users/auth,js");
const {
  createTask,
  idTask,
  readTask,
  updateTask,
  deleteTask,
  getMyTaks,
} = require("../../controllers/task.controller");

const taskRoute = Router();

taskRoute.route("/create").post(auth, createTask);
taskRoute.route("/my-tasks").get(auth, getMyTaks);

taskRoute.param("id", idTask);

taskRoute
  .route("/:id")
  .get(auth, owner, readTask)
  .put(auth, owner, updateTask)
  .patch(auth, owner, updateTask)
  .delete(auth, owner, deleteTask);

module.exports = taskRoute;
