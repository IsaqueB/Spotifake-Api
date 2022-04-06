const express = require("express")

const Controller = require("../controllers/user")

const router = express.Router()

router.post("/", Controller.create)
router.get("/", Controller.get)

module.exports = router

