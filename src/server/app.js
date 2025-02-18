const express = require("express")
require('dotenv').config()
const showTasksRoute = require("../routes/showTasks")
const newTaskRoute = require("../routes/newTask")

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

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(200).send("Home page")
})

app.listen(process.env.PORT, (err) => {
    if(err) throw err
    console.log("Server rodando em: http://localhost:3000")
})