const User = require("../models/user")
const jwt = require("jsonwebtoken")

module.exports = {
    create: async function(req, res) {
        try {
            const {email, password, nickname, genre, birth} = req.body
            if (!email || !password || !nickname || !genre || !birth){
                throw {
                    type: "MISSING", 
                    model: "USER", 
                    method: "CREATE",
                    extra: [
                        email ? undefined : "EMAIL", 
                        password ? undefined : "PASSWORD", 
                        nickname ? undefined : "NICKNAME", 
                        genre ? undefined : "GENRE", 
                        birth ? undefined : "BIRTH"
                    ].filter(entry => entry).join(" ")
                }
            }
            let user = await User.create({
                email,
                password,
                nickname,
                genre,
                birth
            })
            res.user.created(user)
        } catch (e) {
            res.error(e)
        }
    },
    get: async function(req, res) {
        try{
            const {id} = req.params
            if (!id) {
                throw {
                    type: "MISSING", 
                    model: "USER", 
                    method: "GET",
                    extra: "ID"
                }
            }
            const user = await User.findById(id)
            if (!user) {
                throw {
                    type: "NOT_FOUND", 
                    model: "USER", 
                    method: "GET",
                    extra: "USER"
                }
            }
            res.user.one(user)
        } catch(e) {
            res.error(e)
        }
    },
    index: async function(_, res) {
        try {
            const users = await User.find()
            if (!users) {
                throw {
                    type: "NOT_FOUND", 
                    model: "USER", 
                    method: "INDEX",
                    extra: "EMPTY"
                }
            }
            res.user.many(users)
        } catch(e) {
            res.error(e)
        }
    },
    login: async function(req, res) {
        try {
            const {email, password} = req.body
            if (!email || !password) {
                throw {
                    type: "MISSING", 
                    model: "USER", 
                    method: "LOGIN",
                    extra: [
                        email ? undefined : "EMAIL", 
                        password ? undefined : "PASSWORD", 
                    ].filter(entry => entry).join(" ")
                }
            }
            const query = {
                email
            }
            const user = await User.findOne(query).select("+password")
            if (!user) {
                throw {
                    type: "UNAUTHORIZED", 
                    model: "USER", 
                    method: "LOGIN",
                }
            }
            if (!await user.CheckPassword(password)) {
                throw {
                    type: "UNAUTHORIZED", 
                    model: "USER", 
                    method: "LOGIN"
                }
            }
            const payload = {
                id: user._id
            }
            const token = jwt.sign(payload, process.env.AUTH_SECRET)
            res.user.login(user, token)
        } catch (e) {
            res.error(e)
        }
    },
    update: async function(req, res){
        try {
            const {email, password, nickname, genre, birth} = req.body;
            
            const update = {}

            if (email) {
                update.email = email
            }
            if (password) {
                update.password = password
            }
            if (nickname) {
                update.nickname = nickname
            }
            if (genre) {
                update.genre = genre
            }
            if (birth) {
                update.birth = birth
            }

            if (update.length() === 0) {
                throw {
                    type: "MISSING", 
                    model: "USER", 
                    method: "UPDATE",
                    extra: "UPDATE_QUERY_EMPTY"
                }
            }
            const id = res.locals.user.id
            const options = {
                new: true
            }
            const user = await User.findByIdAndUpdate(id, update, options)
            if (!user) {
                throw {
                    type: "NOT_FOUND", 
                    model: "USER", 
                    method: "UPDATE",
                    extra: "USER"
                }
            }
            res.user.updated(user)
        } catch(e) {
            res.error(e)
        }
    },
}