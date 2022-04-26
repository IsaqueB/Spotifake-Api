const jwt = require("jsonwebtoken")

module.exports = {
    auth: async function(req, res, next) {
        try{
            if (!req.headers) {
                throw {
                    type: "MISSING", 
                    model: "", 
                    method: "AUTH",
                    extra: "AUTHORIZATION_HEADER"
                }
            }
            const bearer = req.headers.authorization
            if (!bearer) {
                throw {
                    type: "MISSING", 
                    model: "", 
                    method: "AUTH",
                    extra: "BEARER_TOKEN"
                }
            }
            const [_, token] = bearer.split("Bearer ")
            const payload = jwt.verify(token, process.env.AUTH_SECRET)
            res.locals = {
                user: payload
            }
            next()
        } catch (e) {
            res.error(e)
        }
    }
}