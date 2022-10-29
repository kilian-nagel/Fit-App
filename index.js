
const express = require('express');
const fs = require('fs');
const body_parser = require('body-parser');
const path = require('path')
const cors = require('cors');
const dotenv = require('dotenv').config();
const database_route = require('./controllers/database');
const users_route = require('./controllers/user');

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

app.use('/database',database_route);
app.use('/user',users_route);

/* Listen
=============== */

app.listen(5000 || process.env.PORT);