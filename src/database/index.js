const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/spotifake",{

})

mongoose.connection.on("connected", _ => {
    console.log("connection stablished")
})

mongoose.connection.on("error", err => {
    console.log(err)
})
