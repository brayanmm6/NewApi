const express = require("express")
const db = require("../database")
require('dotenv').config()

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("Home page")
})

app.get("/show", async (req, res) => {
    const client = await db.show()
    res.status(200).json(client)
})

app.listen(process.env.PORT, (err) => {
    if(err) throw err
    console.log("Server rodando em: http://localhost:3000")
})