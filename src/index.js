require("dotenv").config()
const express = require("express")
const cors = require("cors")
require("./database")

const server = express()

server.use(cors())
server.use(express.json())
server.use(require("./routes"))

server.listen("3000")