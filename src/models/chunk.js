const mongoose = require("mongoose")

const chunkSchema = mongoose.Schema({
    content: {
        type: Buffer,
        required: true
    }
})

module.exports = chunkSchema