const Music = require("../model/music.model")
const Album = require("../model/album.model")
const uploadFile = require("../services/storage.services")
const jwt = require("jsonwebtoken")

module.exports.createMusic = async (req, res) => {
    const { title } = req.body
    const file = req.file
    console.log(file)
    const url = await uploadFile(file)
    console.log(url)
    const music = await Music.create({
        title,
        url: url.url,
        artist: req.user.id
    })
    res.status(201).json({
        message: "music created successfully",
        music
    })
}

module.exports.createAlbum = async (req, res) => {
    const { title, music } = req.body
    const album = await Album.create({
        title,
        artist: req.user.id,
        musics: music
    })

    res.status(201).json({
        message: "music created successfully",
        album
    })
}


module.exports.getMusic = async (req, res) => {
    const music = await Music.find().populate("artist")
    res.status(200).json({
        message: "music fetched successfully",
        music
    })
}
