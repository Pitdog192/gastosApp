import jwt from "jsonwebtoken"
import config from "../config/config.js"

export const validateToken = function (req, res, next) {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "Unauthorized" })
    jwt.verify(token, config.secret, (err, decodedUser) => {
        if (err) return res.status(403).json({ message: "Invalid Token" })
        req.user = decodedUser
        next()
    })
}
