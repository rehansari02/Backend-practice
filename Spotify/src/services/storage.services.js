const ImageKit = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file) {
    try {
        const response = await imagekit.files.upload({
            file: file.buffer.toString("base64"),
            fileName: file.originalname + Date.now(),
            folder: "music"
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = uploadFile