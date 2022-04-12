const mongoose = require("mongoose")


mongoose.connect(process.env.MONGO_URL,{

})

mongoose.connection.on("connected", _ => {
    console.log("connection stablished")
})

mongoose.connection.on("error", err => {
    console.log(err)
})
