const express = require("express")

const {auth: AuthMiddleware} = require("../middlewares/auth")
const Controller = require("../controllers/user")

const router = express.Router()

router.post("/", Controller.create)
router.post("/auth/", Controller.login)

router.use(AuthMiddleware)

router.get("/:id", Controller.get)
router.get("/", Controller.index)

module.exports = router

