const express = require("express")
const db = require("../../database")

const populateTableRoute = express.Router()

populateTableRoute.use(express.json())

populateTableRoute.post("/populate-table", async (req, res) => {
    await db.populateTable()
    const data = await db.showNotes()
    res.status(200).send(data)
})

module.exports = populateTableRoute