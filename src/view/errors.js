module.exports = (_, res, next) => {
    res.error = (e) => {
        let status = 500
        let {type, model, method, extra} = e
        switch(type){
            case "MISSING":
                status = 400
                break
            case "NOT_FOUND":
                status = 404
                break
            case "UNAUTHORIZED":
                status = 401
                break
            default:
                type = "INTERNAL"
                model ="UNKNOWN"
                method = "UNKNOWN"
                extra = e.message
                console.log(e)
        }
        return res.status(status).json({
            model,
            method,
            extra
        })
    }
    next()
}