const mysql = require('mysql2/promise');

// .env에서 불러오는 게 좋지만 일단 하드코딩 예제
const pool = mysql.createPool({
  host: 'localhost',
  user: 'myuser',
  password: 'mypass',
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;