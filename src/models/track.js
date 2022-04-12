const mongoose = require("mongoose")

const trackSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
    //Path in public folder for track file
    path: {
        type: String,
        required: true,
        validate: [path => {
            return /^.\/track\//.test(path)
        }, "INVALID_PATH"],
    }
})

module.exports = mongoose.model("Track", trackSchema)