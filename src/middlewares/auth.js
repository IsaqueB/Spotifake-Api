const jwt = require("jsonwebtoken")

module.exports = {
    auth: async function(req, res, next) {
        try{
            const bearer = req.Headers.Authorization
            if (!bearer) {
                throw new Error("MISSING")
            }
            const [_, token] = bearer.split("Bearer ")
            const payload = jwt.verify(token, process.env.AUTH_SECRET)
            res.locals = payload
            next()
        } catch (e) {
            res.status(400).json({e: e.message})
        }
    }
}