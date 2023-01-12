const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = express();
const router = require('./router.js');
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

const swaggerData = require('./swagger.js');
const swaggerOptions = swaggerJSDoc(swaggerData);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
router(app);

const server = http.createServer(app);
server.listen(8080, () => { console.log('Up and ready') });

module.exports = app;
