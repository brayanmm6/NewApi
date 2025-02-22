require("dotenv").config()

const connect = async () => {
    if ( global.connection ) {
        return await global.connection.connect()
    }

    const { Pool }  = require("pg")

    const pool = new Pool ({
        connectionString: "postgres://avnadmin:AVNS_N1i51qPtir3Fjbx8VE6@pg-219ee184-martinsbrayan514-01e0.e.aivencloud.com:17016/defaultdb",

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

const show = async () => {
    const client = await connect()
    const res = await client.query("SELECT * FROM genres")
    console.log(res.rows)
    return res.rows
}

const newTask = async (name, description, image) => {
    const client = await connect()
    const query = await client.query("INSERT INTO genres (name, description, image) values ($1, $2, $3)", [name, description, image])
    const res = await client.query("SELECT * FROM genres")
    return res.rows
}

module.exports = {connect, show, newTask} 