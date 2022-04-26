const Track = require("../models/track")

module.exports = {
    create: async function(req, res) {
        try{
            const {title, author, album, path} = req.body
            if (!title || !author || !album || !path) {
                throw {
                    type: "MISSING", 
                    model: "TRACK", 
                    method: "CREATE",
                    extra: [
                        title ? undefined : "TITLE", 
                        author ? undefined : "AUTHOR", 
                        album ? undefined : "ALBUM", 
                        path ? undefined : "PATH", 
                    ].filter(entry => entry).join(" ")
                }
            }
            const track = await Track.create({
                title,
                author,
                album,
                path
            })
            res.track.created(track)
        } catch (e) {
            res.error(e)
        }
    },
    get: async function(req, res){
        try{
            const {id} = req.params
            const track = await Track.findById(id)
            if (!track) {
                throw {
                    type: "NOT_FOUND", 
                    model: "TRACK", 
                    method: "GET"
                }
            }
            res.track.one(track)
        } catch (e) {
            res.error(e)
        }
    },
    index: async function(_, res){
        try{
            const tracks = await Track.find()
            if (!tracks) {
                throw {
                    type: "NOT_FOUND", 
                    model: "TRACK", 
                    method: "INDEX"
                }
            }
            res.track.many(tracks)
        } catch (e) {
            res.error(e)
        }
    },
    getByName: async function(req, res) {
        try{
            const {name} = req.params
            const track = await Track.findOne({
                name
            })
            if (!track) {
                throw {
                    type: "NOT_FOUND", 
                    model: "TRACK", 
                    method: "GET_BY_NAME"
                }
            }
            res.track.one(track)
        } catch(e) {
            res.error(e)
        }
    }
}