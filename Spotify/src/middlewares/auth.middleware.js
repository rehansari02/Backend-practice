const jwt = require("jsonwebtoken")


module.exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "user is not logged in"
        })
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (decodedToken.role !== "artist") {
        return res.status(403).json({
            message: "user is not authorized"
        })
    }
    req.user = decodedToken
    next()
}

module.exports.authUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "user is not logged in"
        })
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (decodedToken.role !== "user" && decodedToken.role !== "artist") {
        return res.status(403).json({
            message: "user is not authorized"
        })
    }
    req.user = decodedToken
    next()
}