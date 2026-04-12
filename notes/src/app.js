const express = require("express")
const { nanoid } = require("nanoid")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const notes = []

app.post("/notes", (req, res) => {
    const { title, description } = req.body
    if (!title || !description) {
        return res.status(400).json({ message: "title and description are required" })
    }
    const id = nanoid()
    const note = { id, title, description }
    notes.push(note)
    console.log(notes)
    res.status(200).json({ message: "note created successfully", note })
})

app.get("/notes", (req, res) => {
    res.status(200).json({ notes, message: "notes fetched successfully" })
})


app.put("/notes/:id", (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const note = notes.find((note) => note.id === id)
    if (!note) {
        return res.status(404).json({ message: "note not found" })
    }
    note.title = title
    note.description = description
    res.status(200).json({ message: "note updated successfully", note })
})

app.delete("/notes/:id", (req, res) => {
    console.log(req.params.id)
    const { id } = req.params;
    const note = notes.find((note) => note.id === id)
    console.log(note)
    if (!note) {
        return res.status(404).json({ message: "note not found" })
    }
    notes.splice(notes.indexOf(note), 1)
    res.status(200).json({ message: "note deleted successfully", note })
})

module.exports = app
