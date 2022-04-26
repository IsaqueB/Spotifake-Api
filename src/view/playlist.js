function one(playlist) {
    const {name, tracks, createdBy} = playlist
    return {
        name,
        tracks,
        createdBy
    }
}

module.exports = (_, res, next) => {
    res.playlist = {
        created: (playlist) => {
            return res.status(201).json(one(playlist))
        },
        one: (playlist) => {
            return res.status(200).json(one(playlist))
        },
        many: (playlists) => {
            return res.status(200).json(playlists.map(one))
        },
        updated: (playlist) => {
            return res.status(200).json(one(playlist))
        }
    }
    next()
}