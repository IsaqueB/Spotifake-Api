const User = require("../models/user")
const jwt = require("jsonwebtoken")

module.exports = {
    create: async function(req, res) {
        try {
            const {email, password, nickname, genre, birth} = req.body
            if (!email || !password || !nickname || !genre || !birth){
                throw new Error("MISSING")
            }
            let user = await User.create({
                email,
                password,
                nickname,
                genre,
                birth
            })
            user.password = undefined
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
    index: async function(_, res) {
        try {
            const users = await User.find()
            res.json(users)
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
            const query = {
                email
            }
            const user = await User.findOne(query).select("+password")
            if (!user) {
                throw new Error("MISSING")
            }
            if (!await user.CheckPassword(password)) {
                throw new Error("UNAUTHORIZED")
            }
            const payload = {
                id: user._id
            }
            const token = jwt.sign(payload, process.env.AUTH_SECRET)
            res.json({
                user,
                token
            })
        } catch (e) {
            res.status(400).json({e: e.message})
        }
    },
    update: async function(req, res){
        try {
            const {nickname} = req.body;
            if (!nickname) {
                throw new Error("MISSING")
            }
            const query = {
                _id: res.locals.user.id,
            }
            const update = {
                nickname
            }
            const options = {
                new: true
            }
            const user = await User.findOneAndUpdate(query, update, options)
            res.json({
                user
            })
        } catch(e) {
            res.status(400).json({e: e.message})
        }
    },
}