require("dotenv").config()

const connect = async () => {
    if ( global.connection ) {
        return await global.connection.connect()
    }

    const { Pool }  = require("pg")

    const pool = new Pool ({
        connectionString: process.env.CONNECTIONSTRING,

        ssl: {
            rejectUnauthorized: false
        }
    })
    
    const client = await pool.connect()

    const res = await client.query("SELECT NOW()")

    console.log(res.rows)

    client.release()

    global.connection = pool

    return await pool.connect()
} 

const createDb = async () => {
    const client = await connect()
    const res = await client.query("create table notes (id serial primary key, title varchar(120), content text, image text, pinned boolean not null default false, save_time time, save_date date)")
    console.log("sucesso")
    return "success"
}

const newNote = async (title, content) => {
    const client = await connect()
    const res = await client.query("insert into notes (title, content) values ($1, $2)", [title, content])
    return "sucesso" 
}

const showwNotes = async () => {
    const client = await connect()
    // const res = await client.query("Select * from notes") ? "nada" : "tudo"
    // if(res.rows){
    //     console.log("tem algo aqui")
    // } else {
    //     console.log("nada aqui")
    // }
    // return "teste"

    try {
        const res = await client.query("Select * from notes")
        return res.rows
    } catch (err) {
        console.log("tamo aqui")
        await createDb()
        const res = await client.query("Select * from notes")
        return res.rows
    }
}

showwNotes()

module.exports = {connect, newNote, showwNotes, createDb} 