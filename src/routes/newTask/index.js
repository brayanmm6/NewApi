const exress = require("express")
const db = require("../../database")

const newTaskRoute = exress.Router()

newTaskRoute.use(exress.json())

newTaskRoute.post("/tasks/new", async (req, res) => {
    res.header({"Access-Control-Allow-Origin": "*",
        "accept": "application/json",
        "content-type": "application/json; charset=utf-8"
    })
    console.log(req.headers)
    console.log(req.body)
    //const client = await db.newTask(req.body.name, req.body.description, req.body.image)
    //res.status(200).json(client)
    res.status(200).json(req.body)
})

module.exports = newTaskRoute