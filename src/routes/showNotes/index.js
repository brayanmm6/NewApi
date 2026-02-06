const express = require('express')
const db = require("../../database")

const showNoteRoute = express.Router()

showNoteRoute.use(express.json())

showNoteRoute.get('/', async(req, res) => {
    const data = await db.showwNotes()
    res.status(200).send(data)
})

module.exports = showNoteRoute