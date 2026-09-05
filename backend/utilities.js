
const jwt = require("jsonwebtoken")


const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken // requires cookie-parser middleware
  if (!token) {
    return res.status(401).json({ error: true, message: "Unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: true, message: "Invalid or expired token" })
  }
}
module.exports = authenticateToken