const router = require("express").Router()
const Controller = require("../controllers/track")

router.post("/", Controller.create)
router.get("/:id", Controller.get)

module.exports = router
