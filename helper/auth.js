const jwt = require("jsonwebtoken")

const createJwtToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

module.exports = { createJwtToken }
