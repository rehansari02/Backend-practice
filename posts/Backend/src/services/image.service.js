const ImageKit = require("@imagekit/nodejs")

const image = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadImage(file) {
    const result = await image.files.upload({
        file: file.buffer.toString("base64"),
        fileName: file.originalname,
    })
    return result
}

module.exports = uploadImage