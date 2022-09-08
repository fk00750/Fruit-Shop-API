const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

class JwtService {
  static sign(payload, expiry = "30d", secret = JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
}

module.exports = JwtService