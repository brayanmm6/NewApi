const express = require("express")
const db = require("../../database")

const newNoteRoute = express.Router()

newNoteRoute.post("/new-note", async (req, res) => {
    const infos = req.body
    if(req.body){
        await db.addNote(infos.title, infos.content, infos.image)
        res.status(200).send("testando rota!!")
    } else {
        res.status(400).send("Houve um erro em sua requisição")
    }
})

module.exports = newNoteRoute