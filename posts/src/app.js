const express = require("express")
const app = express()
const connectDB = require("./db/db")
const post = require("./models/post.model.js")
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const uploadImage = require("./services/image.service.js")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB().then(() => {
    console.log("database has been connected")
})
    .catch((err) => {
        console.log("database connection failed")
    })

app.post("/create-posts", upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file)
    const result = await uploadImage(req.file)
    console.log(result)
})

module.exports = app