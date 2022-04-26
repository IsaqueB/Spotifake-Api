const Router = require("express").Router()

Router.use(require("./errors"))
Router.use(require("./user"))
Router.use(require("./playlist"))

module.exports = Router