const Playlist = require("../models/playlist")
const Track = require("../models/track")

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
    },
    add_track: async function(req, res) {
        try{
            const {id} = req.params
            if (!id) {
                throw Error("MISSING");
            }
            const {track} = req.body
            if (!track) {
                throw Error("MISSING")
            }
            if (!await Track.findById(track)){
                throw new Error("INVALID")
            }
            const query = {
                _id: id,
                createdBy: res.locals.user.id
            }
            const update = {
                "$push": {
                    tracks: track
                }
            }
            const options = {
                new: true
            }
            const playlist = await Playlist.findOneAndUpdate(query, update, options)
            res.json(playlist)
        } catch(e) {
            res.status(400).json({e: e.message})
        }
    },
    remove_track: async function(req, res) {
        try{
            const {id} = req.params
            if (!id) {
                throw Error("MISSING");
            }
            const {track} = req.body
            if (!track) {
                throw Error("MISSING")
            }
            if (!await Track.findById(track)){
                throw new Error("INVALID")
            }
            const query = {
                _id: id,
                createdBy: res.locals.user.id
            }
            const update = {
                "$pull": {
                    tracks: track
                }
            }
            const options = {
                new: true
            }
            const playlist = await Playlist.findOneAndUpdate(query, update, options)
            res.json(playlist)
        } catch(e) {
            res.status(400).json({e: e.message})
        }
    },
    update: async function(req, res) {
        try {
            const {id} = req.params
            const {name} = req.body
            if (!id) {
                throw new Error("MISSING")
            }
            if (!name) {
                throw new Error("INVALID")
            }
            const query = {
                _id: id,
                createdBy: res.locals.user.id
            }
            const update = {}
            if (name) {
                update.name = name
            }
            const options = {
                new: true
            }
            const playlist = await Playlist.findOneAndUpdate(query, update, options)
            res.json(playlist)
        } catch(e) {
            res.status(400).json({e: e.message})
        }
    },
    delete: async function(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                throw Error("MISSING")
            }
            await Playlist.findByIdAndDelete(id)
            res.json({
                success: true
            })
        } catch(e) {
            res.status(400).json({e: e.message})
        }
    }
}