const { User } = require("../models/index");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    console.log("AUTHEN ASLI");

    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "UNAUTHORIZED" };
    }

    const token = authorization.split(" ")[1];

    const payload = verifyToken(token);

    let user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "UNAUTHORIZED" };
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
}

async function optionalAuthentication(req, res, next) {
  try {
    console.log("JALAN OPTION");

    const { authorization } = req.headers;
    console.log(authorization, "author option");

    if (!authorization) {
      req.user = null;
      return next();
    }

    const token = authorization.split(" ")[1];

    const payload = verifyToken(token);

    let user = await User.findByPk(payload.id);

    if (!user) {
      req.user = null;
      return next();
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
  optionalAuthentication,
};

// UNAUTHORIZED
