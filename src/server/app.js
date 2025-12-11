const express = require("express")
require('dotenv').config()
const showTasksRoute = require("../routes/showTasks")
const newTaskRoute = require("../routes/newTask")
const db = require("../database")

const app = express()

const cors = require('cors');

app.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));-

app.use(express.json())

app.get("/", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const infos = await db.showwNotes()
    res.status(200).send(infos)
})

app.listen(process.env.PORT, (err) => {
    if(err) throw err
    console.log("Server rodando em: http://localhost:3000")
})