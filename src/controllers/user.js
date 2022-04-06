const User = require("../models/user")

module.exports = {
    create: async function(req, res) {
        try {
            const {email, password, nickname, genre, birth} = req.body
            if (!email || !password || !nickname || !genre || !birth){
                throw new Error("MISSING")
            }
            const user = await User.create({
                email,
                password,
                nickname,
                genre,
                birth
            })
            res.status(201).json(user)
        } catch (e) {
            res.status(400).json({e: e.message})
        }
    },
    get: async function(req, res) {
        try{
            const {id} = req.params
            if (!id) {
                throw new Error("MISSING")
            }
            const user = await User.findById(id)
            res.json(user)
        } catch(e) {
            res.status(400).json({e: e.message})
        }
    },
    login: async function(req, res) {
        try {
            const {email, password} = req.body
            if (!email || !password) {
                throw new Error("MISSING")
            }
        } catch (e) {

        }
    }
}