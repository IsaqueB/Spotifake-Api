const Playlist = require("../models/playlist")

module.exports = {
    create: async function(req, res) {
        try{
            const {name} = req.body
            if (!name) {
                throw Error("MISSING")
            }
            const {user} = res.locals
            if (!user) {
                throw Error("MISSING")
            }
            const playlist = await Playlist.create({
                name,
                createdBy: user.id
            })
            res.status(201).json(playlist)
        } catch (e) {
            res.status(400).json({e: e.message})
        }
    },
    get: async function(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                throw Error("MISSING")
            }
            const playlist = await Playlist.findById(
                id
            )
            res.json(playlist)
        } catch (e) {
            res.status(400).json({e: e.message})
        }
    },
    index: async function(req, res) {
        try{
            const {user} = req.params
            if (!user) {
                throw Error("MISSING")
            }
            const playlists = await Playlist.find({
                createdBy: user
            })
            res.json(playlists)
        } catch(e) {
            res.status(400).json({e: e.message})
        }
    }
}