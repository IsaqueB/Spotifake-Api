const mongoose = require("mongoose")

const mongo_url = process.env.MONGO_URL  || "mongodb://localhost:27017/spotifake-api"

mongoose.connect(process.env.MONGO_URL,{
})

mongoose.connection.on("connected", _ => {
    console.log("(MONGO) connection stablished")
})

mongoose.connection.on("error", err => {
    console.log("(MONGO) "+err)
})
