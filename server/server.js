const express = require("express");
const mysql = require("mysql");
const myconnection = require("express-myconnection");
const cors = require("cors");

const app = express();

app.use(myconnection(mysql, {
    host: 'localhost',
    port: 3306,
    user: 'ValGo',
    password: 'Albaricoque9',
    database: 'Plataforma_ValGo'
}))

app.use(cors());

app.use(require('./routes/api'));

var port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log('Server running', process.pid, 'listening on port', 'http://localhost:' + port);
});