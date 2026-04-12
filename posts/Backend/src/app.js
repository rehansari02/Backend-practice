const express = require("express")
const app = express()
const connectDB = require("./db/db")
const post = require("./models/post.model.js")
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const uploadImage = require("./services/image.service.js")
var cors = require('cors')
app.use(cors())

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
    const data = new post({
        image: result.url,
        caption: req.body.caption
    })
    await data.save()
    res.status(200).json({ message: "post created successfully", data })
})

app.get("/get-posts", async (req, res) => {
    const data = await post.find()
    res.status(200).json({ message: "posts fetched successfully", data })
})

module.exports = app