function one(user){
    const {_id, email, nickname, genre, birth} = user
    return {
        _id, 
        email, 
        nickname, 
        genre, 
        birth
    }
}

module.exports = (_, res, next) => {
    res.user = {
        created: (user) => {
            return res.status(201).json(one(user))
        },
        one: (user) => {
            return res.status(200).json(one(user))
        },
        many: (users) => {
            return res.status(200).json(users.map(one))
        },
        login: (user, jwt) => {
            return res.status(200).json({
                user: one(user),
                jwt
            })
        },
        updated: (user) => {
            return res.status(200).json(one(user))
        }
    }
    next()
}