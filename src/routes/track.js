const router = require("express").Router()
const Controller = require("../controllers/track")

router.post("/", Controller.create)
router.get("/:id", Controller.get)
router.get("/", Controller.index)

module.exports = router
