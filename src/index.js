const express = require("express")
require("./database")

const server = express()

server.use(express.json())
server.use(require("./routes"))

console.log("test")

server.listen("3000")