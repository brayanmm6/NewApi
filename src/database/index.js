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

const show = async () => {
    const client = await connect()
    const res = await client.query("SELECT * FROM genres")
    console.log(res.rows)
    return res.rows
}

const newData = async () => {
    const client = await connect()
    const res = await client.query("CREATE TABLE genres (id serial primary key, name varchar (120), description text, image text, saving_date date NOT NULL DEFAULT CURRENT_DATE )")
}

const newTask = async (name, description, image) => {
    const client = await connect()
    const query = await client.query("INSERT INTO genres (name, description, image) values ($1, $2, $3)", [name, description, image])
    const res = await client.query("SELECT * FROM genres")
    return res.rows
}

const movies = [
    {name: "Ação", desc: "Filmes cheios de movimento, perseguições, lutas e explosões. O foco está na adrenalina e no ritmo acelerado.", url: "https://chatgpt.com/s/m_68acf7ec19b8819182281dd9ce1d37b1"},
    {name: "Comédia", desc: "Criados para provocar risadas, explorando situações engraçadas, exageradas ou irônicas.", url: "https://chatgpt.com/s/m_68acf8f8dde08191a5299fb05ee8a697"},
    {name: "Terror", desc: "Criados para causar medo, tensão e suspense. Podem envolver monstros, fantasmas ou situações psicológicas perturbadoras.", url: "https://chatgpt.com/s/m_68acf931c408819184656d579663f2f3"},
    {name: "Ficção Científica (Sci-Fi)", desc: "Explora tecnologia futurista, viagens espaciais, inteligência artificial e mundos alternativos.", url: "https://chatgpt.com/s/m_68acf98ee3888191936463c275bfe57d"},
    {name: "Documentário", desc: "Obras que retratam a realidade, explorando fatos, eventos ou pessoas de forma informativa.", url: "https://chatgpt.com/s/m_68acfa0abf4081919daf8c4412eee87c"},
    {name: "Suspense", desc: "Histórias cheias de mistério, tensão psicológica e reviravoltas inesperadas.", url: "https://chatgpt.com/s/m_68acfa8d439081918efc5dedc3faa8d9"},
    {name: "Drama", desc: "Explora emoções humanas, conflitos pessoais e dilemas sociais. Muitas vezes, são histórias intensas e realistas.", url: "https://chatgpt.com/s/m_68acfb11875481918d52b1a197d80c0a"}
]

module.exports = {connect, show, newTask} 