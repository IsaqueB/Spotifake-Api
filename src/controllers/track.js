const Track = require("../models/track")

module.exports = {
    create: async function(req, res) {
        try{
            const {title, author, path} = req.body
            if (!title || !author || !path) {
                throw new Error("MISSING")
            }
            const track = await Track.create({
                title,
                author,
                path
            })
            res.status(201).json(track)
        } catch (e) {
            res.status(400).json({e: e.message})
        }
    },
    get: async function(req, res){
        try{
            const {id} = req.params
            const track = await Track.findById(id)
            if (!track) {
                throw Error("NOT_FOUND")
            }
            res.json(track)
        } catch (e) {
            res.status(400).json({e: e.message})
        }
    },
}