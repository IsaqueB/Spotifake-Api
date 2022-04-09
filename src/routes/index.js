const express = require("express")

const router = express.Router()

router.use("/user", require("./user"))
router.use("/playlist", require("./playlist"))
router.use("/track", require("./track"))

module.exports = router
