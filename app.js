const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = express();
const router = require('./router.js');

const swaggerData = require('./swagger.js');
const swaggerOptions = swaggerJSDoc(swaggerData);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use("/api", router);

const server = http.createServer(app);
server.listen(8080, () => { console.log('Up and ready') });

module.exports = app;
