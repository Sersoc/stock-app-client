const pool = require("../config/db");

const getFavorites = async (userId) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM favorites WHERE (userId = ?)`,
      [userId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const addFavorites = async (userId, symbol) => {
  try {
    await pool.query(`INSERT INTO favorites (userId, symbol) VALUES (?,?)`, [
      userId,
      symbol,
    ]);
  } catch (error) {
    throw error;
  }
};
module.exports = { getFavorites, addFavorites };
