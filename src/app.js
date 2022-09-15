const express = require('express');
const router = require("./routes/index.js");
const server = express();

// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');


// server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// server.use(bodyParser.json({ limit: '50mb' }));
// server.use(cookieParser());
// server.use(morgan('dev'));




// inicializando las rutas 
server.use('/', router);

module.exports = server;