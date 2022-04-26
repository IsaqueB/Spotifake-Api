const mongoose = require("mongoose")

const mongo_url = process.env.MONGO_URL  || "mongodb://localhost:27017/spotifake-api"

mongoose.connect(mongo_url,{
})

mongoose.connection.on("connected", _ => {
    console.log("(MONGO) connection stablished")
})

mongoose.connection.on("error", err => {
    console.log("(MONGO) "+err)
})
