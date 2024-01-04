const notFoundMIDWR = (req, res, next) => {
  next({
    message: "Route not Found",
    statusCode: 404,
  });
};

const errorMIDWR = (err, req, res, next) => {
  const { message = "", statusCode = 500 } = err;
  res.status(statusCode);
  res.json({
    message,
    statusCode,
  });
};

module.exports = { notFoundMIDWR, errorMIDWR };
