const exress = require("express")
const db = require("../../database")

const newTaskRoute = exress.Router()

newTaskRoute.post("/new-task", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const client = await db.newTask(req.body.name, req.body.description, req.body.image)
    res.status(200).json(client)
})

module.exports = newTaskRoute