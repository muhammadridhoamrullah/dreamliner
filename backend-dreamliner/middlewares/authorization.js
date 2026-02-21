 function authorization(allowedRoles) {
  return (req, res, next) => {
    try {
      const { role } = req.user;

      if (!allowedRoles.includes(role)) {
        throw { name: "FORBIDDEN" };
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  authorization,
};
