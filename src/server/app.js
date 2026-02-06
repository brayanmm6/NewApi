const express = require("express")
require('dotenv').config()
const showNoteRoute = require("../routes/showNotes")
const newNoteRoute = require("../routes/newNote")
const db = require("../database")

const app = express()

const cors = require('cors');

app.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json())

app.use(showNoteRoute)

app.use(newNoteRoute)

app.get("/", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const infos = await db.showwNotes()
    if (infos) {
        res.status(200).send(infos)
    } else {
         await db.createDb()
    }

    return infos
})

app.listen(process.env.PORT, (err) => {
    if(err) throw err
    console.log("Server rodando em: http://localhost:3000")
})

// app.listen(3000, error => {
//     if(error) throw error
//     console.log("server rodando em http://localhost:3000")
// })