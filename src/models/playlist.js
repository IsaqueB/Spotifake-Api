const mongoose = require("mongoose")

const playlistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tracks: [{
        type: mongoose.Types.ObjectId,
        ref: "Track"
    }],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Playlist", playlistSchema)