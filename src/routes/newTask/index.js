const exress = require("express")
const db = require("../../database")

const newTaskRoute = exress.Router()

newTaskRoute.post("/new-task", async (req, res) => {
    res.header({"Access-Control-Allow-Origin": "http://localhost:5173"})
    console.log(req.body)
    const client = await db.newTask(req.body.name, req.body.description, req.body.image)
    //res.status(200).json(client)
    res.status(200).send({message: "Funfou"})
})

module.exports = newTaskRoute