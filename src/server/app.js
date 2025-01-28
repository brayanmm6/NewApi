const express = require("express")
const db = require("../database")
require('dotenv').config()
const showTasksRoute = require("../routes/showTasks")

const app = express()

app.use(express.json())

app.use(showTasksRoute)

app.get("/", (req, res) => {
    res.status(200).send("Home page")
})

// app.get("/show", async (req, res) => {
//     const client = await db.show()
//     // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
//     // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.status(200).json(client)
// })

app.listen(process.env.PORT, (err) => {
    if(err) throw err
    console.log("Server rodando em: http://localhost:3000")
})