const pool = require("../config/db");

const getFavorites = async(userId) =>{
    try{
        const [rows]  = await pool.query(`SELECT * FROM favorites WHERE (user_id = ?)`,[userId]);
        return rows;
    } catch(error){
        throw error;
    }
    
};

const addFavorites = async(userId, symbol) => {

};
module.exports = {getFavorites ,addFavorites};