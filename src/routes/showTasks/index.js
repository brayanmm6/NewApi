const express = require('express')
const db = require('../../database')

const showTasksRoute = express.Router()

showTasksRoute.get("/show", async (req, res) => {
    try {
        const client = await db.show()
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.status(200).json(client)
    }catch (err) {
        res.status(404).send({message: "Houve um erro na sua requisição!"})
    }
})

module.exports = showTasksRoute