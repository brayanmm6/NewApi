require("dotenv").config()

const connect = async () => {
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

    return await pool.connect()
}   

const show = async () => {
    const client = await connect()
    const res = await client.query("SELECT * FROM genres")
    console.log(res.rows)
    return res.rows
}

module.exports = {connect, show} 