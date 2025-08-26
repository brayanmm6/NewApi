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
}));

app.use(express.json())

app.use(showTasksRoute)

app.use(newTaskRoute)

app.get("/", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const infos = await db.show()
    res.status(200).json(infos)
})

app.listen(process.env.PORT, (err) => {
    if(err) throw err
    console.log("Server rodando em: http://localhost:3000")
})