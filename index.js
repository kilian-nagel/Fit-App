
const express = require('express');
const fs = require('fs');
const body_parser = require('body-parser');
const path = require('path')
const cors = require('cors');
const dotenv = require('dotenv').config();
const users_route = require('./controllers/database');

/* Parsers 
=============== */

const app = express();
app.use(cors({
    origin:'*'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(body_parser.urlencoded({extended:false}));

/* Routes
=============== */

console.log(process.env.MONGODB_CONNECTION_URI);
app.use('/auth',users_route);

/* Listen
=============== */

app.listen(5000 || process.env.PORT);