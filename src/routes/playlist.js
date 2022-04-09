const express = require("express")

const {auth: AuthMiddleware} = require("../middlewares/auth")
const Controller = require("../controllers/playlist")

const router = express.Router()

router.get("/user/:user", Controller.index)
router.get("/:id", Controller.get)

router.use(AuthMiddleware)

router.post("/", Controller.create)
router.put("/:id", Controller.update)
router.put("/track/add/:id", Controller.add_track)
router.put("/track/remove/:id", Controller.remove_track)
router.delete("/:id", Controller.delete)

module.exports = router