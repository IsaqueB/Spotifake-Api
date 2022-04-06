// nascimento, email, nome, senha, genero
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [email => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        }, "INVALID_MAIL"],
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    birth:{
        type: Date,
        required: true
    }
})

userSchema.pre("save", async function(next) {
    try{
        this.password = await bcrypt.hash(this.password, 10);
        next()
    } catch (e) {
        next(e)
    }
})

module.exports = mongoose.model("User", userSchema)