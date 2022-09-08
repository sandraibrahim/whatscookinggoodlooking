const jwt = require("jsonwebtoken");
exports.createJWT = (username, userId, duration) => {
   const payload = {
      username,
      userId,
      duration
   };
   return jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: duration,
   });
};