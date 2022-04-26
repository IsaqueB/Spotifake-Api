const Playlist = require("../models/playlist")
const Track = require("../models/track")

module.exports = {
    create: async function(req, res) {
        try{
            const {name} = req.body
            if (!name) {
                throw {
                    type: "MISSING", 
                    model: "PLAYLIST", 
                    method: "CREATE",
                    extra: "NAME"
                }
            }
            const playlist = await Playlist.create({
                name,
                createdBy: res.locals.user.id
            })
            res.playlist.created(playlist)
        } catch (e) {
            res.error(e)
        }
    },
    get: async function(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                throw {
                    type: "MISSING", 
                    model: "PLAYLIST", 
                    method: "GET",
                    extra: "ID"
                }
            }
            const playlist = await Playlist.findById(
                id
            ).populate("tracks")
            if (!playlist) {
                throw {
                    type: "NOT_FOUND", 
                    model: "PLAYLIST", 
                    method: "GET",
                    extra: "PLAYLIST"
                }
            }
            res.playlist.one(playlist)
        } catch (e) {
            res.error(e)
        }
    },
    index: async function(req, res) {
        try{
            const {user} = req.params
            if (!user) {
                throw {
                    type: "MISSING", 
                    model: "PLAYLIST", 
                    method: "INDEX",
                    extra: "USER"
                }
            }
            const playlists = await Playlist.find({
                createdBy: user
            }).populate("tracks")
            if (!playlists) {
                throw {
                    type: "NOT_FOUND", 
                    model: "PLAYLIST", 
                    method: "INDEX",
                    extra: "EMPTY"
                }
            }
            res.playlist.many(playlists)
        } catch(e) {
            res.error(e)
        }
    },
    add_track: async function(req, res) {
        try{
            const {id} = req.params
            if (!id) {
                throw {
                    type: "MISSING", 
                    model: "PLAYLIST", 
                    method: "ADD_TRACK",
                    extra: "ID"
                }
            }
            const {track} = req.body
            if (!track) {
                throw {
                    type: "MISSING", 
                    model: "PLAYLIST", 
                    method: "ADD_TRACK",
                    extra: "TRACK"
                }
            }
            if (!await Track.findById(track)){
                throw {
                    type: "NOT_FOUND", 
                    model: "PLAYLIST", 
                    method: "ADD_TRACK",
                    extra: "TRACK"
                }
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
            if (!playlist) {
                throw {
                    type: "NOT_FOUND", 
                    model: "PLAYLIST", 
                    method: "REMOVE_TRACK",
                    extra: "PLAYLIST"
                }
            }
            res.playlist.updated(playlist)
        } catch(e) {
            res.error(e)
        }
    },
    remove_track: async function(req, res) {
        try{
            const {id} = req.params
            if (!id) {
                throw {
                    type: "MISSING", 
                    model: "PLAYLIST", 
                    method: "REMOVE_TRACK",
                    extra: "ID"
                }
            }
            const {track} = req.body
            if (!track) {
                throw {
                    type: "MISSING", 
                    model: "PLAYLIST", 
                    method: "REMOVE_TRACK",
                    extra: "TRACK"
                }
            }
            if (!await Track.findById(track)){
                throw {
                    type: "NOT_FOUND", 
                    model: "PLAYLIST", 
                    method: "REMOVE_TRACK",
                    extra: "TRACK"
                }
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
            if (!playlist) {
                throw {
                    type: "NOT_FOUND", 
                    model: "PLAYLIST", 
                    method: "REMOVE_TRACK",
                    extra: "PLAYLIST"
                }
            }
            res.playlist.updated(playlist)
        } catch(e) {
            res.error(e)
        }
    },
    update: async function(req, res) {
        try {
            const {id} = req.params
            const {name} = req.body
            if (!id) {
                throw {
                    type: "MISSING", 
                    model: "PLAYLIST", 
                    method: "UPDATE",
                    extra: "ID"
                }
            }
            if (!name) {
                throw {
                    type: "MISSING", 
                    model: "PLAYLIST", 
                    method: "UPDATE",
                    extra: "NAME"
                }
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
            res.playlist.updated(playlist)
        } catch(e) {
            res.error(e)
        }
    },
    delete: async function(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                throw {
                    type: "MISSING", 
                    model: "PLAYLIST", 
                    method: "DELETE",
                    extra: "ID"
                }
            }
            await Playlist.findByIdAndDelete(id)
            res.playlist.deleted(playlist)
        } catch(e) {
            res.error(e)
        }
    }
}