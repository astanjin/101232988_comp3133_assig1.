const jwt = require("jsonwebtoken")

const authentication = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || ""

  try {
    const verified = jwt.verify(token, process.env.SECRET)
    req.verifiedUser = verified.user
    console.log("Verificated!", verified)
    next()
  } catch (err) {
    console.log("fail to verify!", err)
    next()
  }
}

module.exports = { authentication}
