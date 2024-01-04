const UserModel = require("../models/user.model");
const { signToken } = require("../routes/users/auth,js");

exports.signup = async (req, res, next) => {
  const { body = {} } = req;
  const document = new UserModel(body);

  try {
    const data = await document.save();

    res.status(201);
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { body = {} } = req;
  console.log(body);
  const { email = "", password = "" } = body;

  const document = await UserModel.findOne({ email });

  if (document) {
    const verified = await document.verifyPassword(password);
    if (verified) {
      const payload = {
        id: document._id,
      };
      const token = signToken(payload);

      res.json({
        data: { document, token: token },
      });
    } else {
      next({
        message: "Username or password are incorrect",
      });
    }
  } else {
    next({
      message: "Username or password are incorrect",
    });
  }
};
