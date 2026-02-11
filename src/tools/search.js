const db = require("../database")

const searchById = async(id) => {
    const check = await db.searchNote(id)
    if(check.length){
        return true
    }else{
        return false
    }
}

module.exports = searchById