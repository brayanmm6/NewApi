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

const newNote = async (title, content) => {
    const client = await connect()
    const res = await client.query("insert into notes (title, content) values ($1, $2)", [title, content])
    return "sucesso" 
}

const showwNotes = async () => {
    const client = await connect()
    const res = await client.query("Select * from notes")
    return res.rows
}

module.exports = {connect, newNote} 