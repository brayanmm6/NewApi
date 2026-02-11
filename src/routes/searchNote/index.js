const express = require("express")
const db = require("../../database")

const searchNoteRoute = express.Router()

searchNoteRoute.use(express.json())

searchNoteRoute.get("/search", async(req, res) => {
    const id = req.body.id
    const info = await db.searchNote(id)
    res.status(200).send("SUCCESS")
})

module.exports = searchNoteRoute