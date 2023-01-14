const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'library'
})

db.connect((error) => {
  if (error) console.log('error', error);
  else console.log('db connected');
});

module.exports = db;
