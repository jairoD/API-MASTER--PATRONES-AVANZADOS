const decode = require("jsonwebtoken/decode");
const TaskModel = require("../models/task.model");
const mongoose = require("mongoose");
const { Schema } = mongoose;

exports.getMyTaks = async (req, res, next) => {
  try {
    const decoded = req.decoded;
    const response = await TaskModel.find({ author: decoded.id }).exec();
    if (response) {
      res.status(200);
      res.json({
        response,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { body = {}, decoded = {} } = req;
    const { id } = decoded;
    const taskData = new TaskModel({
      ...body,
      author: id,
    });
    response = await taskData.save();
    res.status(201);
    res.json({
      response,
    });
  } catch (error) {
    next(error);
  }
};

exports.readTask = async (req, res, next) => {
  try {
    console.log("asdasdasd");
    const { params = {}, body = {} } = req;
    const response = await TaskModel.findById(params.id ?? "").exec();
    if (response) {
      res.status(200);
      res.json({
        response: response,
      });
    } else {
      next({
        statusCode: 404,
        message: "Document not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { body = {}, params = {} } = req;
    const { id } = params;
    const data = await TaskModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const response = await TaskModel.findByIdAndDelete(id);
    if (response) {
      res.status(200);
      res.json({
        response: response,
      });
    } else {
      next({
        statusCode: 404,
        message: "Document not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.idTask = async (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;

  try {
    const data = await TaskModel.findById(id)
      .populate(
        [
          ...Object.getOwnPropertyNames({
            author: {
              type: Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
          }),
        ].join(" ")
      )
      .exec();
    if (data) {
      req.doc = data;
      next();
    } else {
      next({
        statusCode: 404,
        message: "Document not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
