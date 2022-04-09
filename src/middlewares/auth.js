const jwt = require("jsonwebtoken")

module.exports = {
    auth: async function(req, res, next) {
        try{
            if (!req.headers) {
                throw new Error("MISSING_AUTH")
            }
            const bearer = req.headers.authorization
            if (!bearer) {
                throw new Error("MISSING")
            }
            const [_, token] = bearer.split("Bearer ")
            const payload = jwt.verify(token, process.env.AUTH_SECRET)
            res.locals = {
                user: payload
            }
            next()
        } catch (e) {
            res.status(400).json({e: e.message})
        }
    }
}