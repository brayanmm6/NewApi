require("dotenv").config()

const connect = async () => {
    if ( global.connection ) {
        return global.connection.connect()
    }

    const { Pool }  = require("pg")

    const pool = new Pool ({
        connectionString: process.env.CONNECTIONSTRING,

        // ssl: {
        //     rejectUnauthorized: false
        // }
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
    const res = await client.query("create table notes (id serial primary key, title varchar(120), content text, image text, pinned boolean not null default false, save_time time not null default current_time, save_date date not null default current_date)")
    console.log("sucesso")
    return "success"
}

const newNote = async (title, content) => {
    const client = await connect()
    const res = await client.query("insert into notes (title, content) values ($1, $2)", [title, content])
    return "success" 
}

const showNotes = async () => {
    const client = await connect()
    try {
        const res = await client.query("Select * from notes")
        console.log(res.rows)
        return res.rows
    } catch (error) {
      console.log("antes")
        await createDb()
        console.log("depois")
        const res = await client.query("Select * from notes")
        return res.rows
    }
}

const editNote = async (target, value, id) => {
    const client = await connect()
    
    switch(target){
      case "title":
        await client.query("update notes set title = $1 where id = $2", [value, id])
      break
      case "content":
        await client.query("update notes set content = $1 where id = $2", [value, id])
      break
      case "image":
        await client.query("update notes set image = $1 where id = $2", [value, id])
      break
    }
    const res = await showNotes() 
    return res.rows
}

const deleteNote = async (id) => {
    const client = await connect()
    await client.query("delete from notes where id = $1", [id])
    const res = await showNotes()
    return res.rows
}

const addNote = async (title, content, image) => {
    const client = await connect()
    await client.query("insert into notes (title, content, image) values ($1, $2, $3)", [title, content, image])
    const res = await showNotes()
    return res.rows
}

const searchNote = async (id) => {
  const client = await connect()
  const res = await client.query("select * from notes where id = $1", [id])
  return res.rows
}



const exampleData = [
  {
    "title": "Artificial Intelligence",
    "content": "Artificial Intelligence refers to the simulation of human intelligence in machines that are programmed to think, learn, and solve problems.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Artificial+Intelligence"
  },
  {
    "title": "Climate Change",
    "content": "Climate change describes long-term shifts in temperatures and weather patterns, mainly caused by human activities.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Climate+Change"
  },
  {
    "title": "Space Exploration",
    "content": "Space exploration involves the use of astronomy and space technology to explore outer space and celestial bodies.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Space+Exploration"
  },
  {
    "title": "Renewable Energy",
    "content": "Renewable energy comes from natural sources that are constantly replenished, such as solar, wind, and hydro power.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Renewable+Energy"
  },
  {
    "title": "Cybersecurity",
    "content": "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Cybersecurity"
  },
  {
    "title": "Blockchain Technology",
    "content": "Blockchain is a distributed ledger technology that ensures secure and transparent record-keeping.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Blockchain+Technology"
  },
  {
    "title": "Virtual Reality",
    "content": "Virtual Reality creates a simulated digital environment that users can interact with using special equipment.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Virtual+Reality"
  },
  {
    "title": "Machine Learning",
    "content": "Machine Learning is a subset of AI that allows systems to learn and improve from experience without being explicitly programmed.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Machine+Learning"
  },
  {
    "title": "Internet of Things",
    "content": "The Internet of Things refers to a network of interconnected devices that communicate and exchange data.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Internet+of+Things"
  },
  {
    "title": "Smart Cities",
    "content": "Smart cities use digital technology and data to improve infrastructure, services, and quality of life.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Smart+City"
  },
  {
    "title": "E-commerce",
    "content": "E-commerce involves buying and selling goods and services over the internet.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=E-commerce"
  },
  {
    "title": "Digital Marketing",
    "content": "Digital marketing uses online platforms and digital technologies to promote products and services.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Digital+Marketing"
  },
  {
    "title": "Cloud Computing",
    "content": "Cloud computing provides on-demand computing resources over the internet, including storage and processing power.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Cloud+Computing"
  },
  {
    "title": "Big Data",
    "content": "Big Data refers to extremely large datasets that can be analyzed to reveal patterns and trends.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Big+Data"
  },
  {
    "title": "Robotics",
    "content": "Robotics is the branch of technology that deals with the design, construction, and operation of robots.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Robotics"
  },
  {
    "title": "Augmented Reality",
    "content": "Augmented Reality overlays digital information onto the real world using devices like smartphones or smart glasses.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Augmented+Reality"
  },
  {
    "title": "Quantum Computing",
    "content": "Quantum computing uses quantum mechanics to perform calculations at speeds far beyond classical computers.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Quantum+Computing"
  },
  {
    "title": "Biotechnology",
    "content": "Biotechnology uses biological processes and organisms to develop products and technologies for various industries.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Biotechnology"
  },
  {
    "title": "Autonomous Vehicles",
    "content": "Autonomous vehicles are capable of navigating and driving without human intervention using sensors and AI.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Autonomous+Vehicles"
  },
  {
    "title": "Sustainable Agriculture",
    "content": "Sustainable agriculture focuses on farming practices that protect the environment and ensure long-term food production.",
    "imageLink": "https://www.google.com/search?tbm=isch&q=Sustainable+Agriculture"
  }
]

const exampleData1 = [
    {
      "title": "Artificial Intelligence",
      "content": "Artificial Intelligence focuses on creating machines that can simulate human intelligence, including learning, reasoning, and problem-solving.",
      "image": "https://www.gstatic.com/images/branding/product/2x/ai_96dp.png"
    },
    {
      "title": "Space Exploration",
      "content": "Space exploration involves the use of astronomy and space technology to explore outer space and understand the universe.",
      "image": "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    },
    {
      "title": "Climate Change",
      "content": "Climate change refers to long-term shifts in temperatures and weather patterns, mainly caused by human activities.",
      "image": "https://www.gstatic.com/earth/social/00_generic_facebook-001.jpg"
    },
    {
      "title": "Blockchain Technology",
      "content": "Blockchain is a decentralized digital ledger technology used to record transactions securely and transparently.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/security_black_48dp.png"
    },
    {
      "title": "Virtual Reality",
      "content": "Virtual Reality creates immersive digital environments that users can interact with using specialized equipment.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/visibility_black_48dp.png"
    },
    {
      "title": "Cybersecurity",
      "content": "Cybersecurity protects computer systems and networks from information disclosure, theft, or damage.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/shield_black_48dp.png"
    },
    {
      "title": "Renewable Energy",
      "content": "Renewable energy comes from natural sources like sunlight, wind, and water that are constantly replenished.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/wb_sunny_black_48dp.png"
    },
    {
      "title": "Smart Cities",
      "content": "Smart cities use technology and data to improve infrastructure, transportation, and quality of life.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/location_city_black_48dp.png"
    },
    {
      "title": "Internet of Things",
      "content": "The Internet of Things connects physical devices to the internet, enabling them to collect and exchange data.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/devices_black_48dp.png"
    },
    {
      "title": "Machine Learning",
      "content": "Machine learning allows computers to learn from data and improve performance without explicit programming.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/auto_graph_black_48dp.png"
    },
    {
      "title": "Robotics",
      "content": "Robotics is the field of designing and building robots to perform tasks automatically or semi-autonomously.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/build_black_48dp.png"
    },
    {
      "title": "Quantum Computing",
      "content": "Quantum computing uses quantum mechanics to process information in ways traditional computers cannot.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/memory_black_48dp.png"
    },
    {
      "title": "Augmented Reality",
      "content": "Augmented Reality overlays digital content onto the real world through devices like smartphones or glasses.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/view_in_ar_black_48dp.png"
    },
    {
      "title": "Big Data",
      "content": "Big Data involves analyzing extremely large data sets to uncover patterns, trends, and insights.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/storage_black_48dp.png"
    },
    {
      "title": "5G Technology",
      "content": "5G is the latest generation of mobile networks, offering faster speeds and lower latency.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/network_cell_black_48dp.png"
    },
    {
      "title": "E-Commerce",
      "content": "E-commerce refers to buying and selling goods and services over the internet.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/shopping_cart_black_48dp.png"
    },
    {
      "title": "Digital Marketing",
      "content": "Digital marketing uses online platforms and technologies to promote products and services.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/campaign_black_48dp.png"
    },
    {
      "title": "Cloud Computing",
      "content": "Cloud computing provides on-demand access to computing resources over the internet.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/cloud_black_48dp.png"
    },
    {
      "title": "Biotechnology",
      "content": "Biotechnology uses biological systems and organisms to develop products for health and industry.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/science_black_48dp.png"
    },
    {
      "title": "Autonomous Vehicles",
      "content": "Autonomous vehicles use sensors and AI to navigate and operate without human intervention.",
      "image": "https://www.gstatic.com/images/icons/material/system/2x/directions_car_black_48dp.png"
    }
  ]

const populateTable = async(title, content, image) => {
    exampleData1.map(async item => {
        await addNote(item.title, item.content, item.image)
    })
    const res = await showNotes()
    console.log(res.rows)
}

module.exports = {connect, newNote, showNotes, createDb, editNote, deleteNote, addNote, searchNote, populateTable} 