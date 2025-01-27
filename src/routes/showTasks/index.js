const express = require('express')
const db = require('../../database')

const ShowTasksRoute = express.Router()

ShowTasksRoute.get("/show", async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*")
        const client = await db.show()
        if(client.rows.length) res.status(200).json(client.rows)
    }catch (err) {
        res.status(404).send({message: "Houve um erro na sua requisição!"})
    }
})

module.exports = { ShowTasksRoute }