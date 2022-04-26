require("dotenv").config()
const express = require("express")
const cors = require("cors")
require("./database")

const server = express()

server.use(cors())
server.use(express.json())
server.use(require("./view"))
server.use(require("./routes"))

const PORT = process.env.PORT || 3001
server.listen(PORT)
console.log(`LISTENING TO :${PORT}`)