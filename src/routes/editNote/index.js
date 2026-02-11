const express = require("express")
const db = require("../../database")

const editNoteRoute = express.Router()

editNoteRoute.put("/edit-note", async(req, res) => {
    const infos = req.body
    await db.editNote(infos.target, infos.value, infos.id)
    const search = await db.searchNote(infos.id)
    res.status(200).send(search)
})

module.exports = editNoteRoute