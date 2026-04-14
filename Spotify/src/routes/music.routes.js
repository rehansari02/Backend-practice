const express = require("express")
const router = express.Router()
const { createMusic, createAlbum, getMusic } = require("../controllers/music.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const { authMiddleware, authUser } = require("../middlewares/auth.middleware")




router.post("/upload", upload.single("file"), authMiddleware, createMusic)
router.post("/createAlbum", authMiddleware, upload.single("file"), createAlbum)
router.get("/getMusic", authUser, getMusic)



module.exports = router