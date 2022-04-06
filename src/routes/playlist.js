const express = require("express")

const Controller = require("../controllers/playlist")
const AuthMiddleware = (_, res, next) => {
    res.locals.user = {
        id: "624cb75e5dd3f15979467c63"
    }
    next()
}

const router = express.Router()

router.post("/", AuthMiddleware, Controller.create)
router.get("/:id", AuthMiddleware, Controller.get)
router.get("/user/:user", Controller.index)

module.exports = router