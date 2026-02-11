const express = require("express")
const db = require("../../database")
const searchById = require("../../tools/search")

const deleteNoteRoute = express.Router()

deleteNoteRoute.delete("/delete-note", async(req, res) => {
    const info = req.body
    const check = await searchById(info.id)
    if(check === false){
        res.status(200).send({"message": `o id ${info.id} nao foi encontrado.`})
        return
    }
    await db.deleteNote(info.id)
    res.status(200).send({"message": "Delete realizado com sucesso!!!"})
})

module.exports = deleteNoteRoute