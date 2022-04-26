const mongoose = require("mongoose")


mongoose.connect(process.env.MONGO_URL,{
})

mongoose.connection.on("connected", _ => {
    console.log("(MONGO) connection stablished")
})

mongoose.connection.on("error", err => {
    console.log("(MONGO) "+err)
})
