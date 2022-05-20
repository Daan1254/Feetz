const express = require('express');
app = express()
app.use(express.json()) // nodig om inputdata in json te verwerken
var mysql = require('mysql');

var db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "Feetz",
});

db.connect((err) => {

    if (err) logger.fatal("Er kan geen connectie worden gemaakt met de database");
    if (err) throw err;
    console.log("Connected!");
    logger.debug("Database connection established");
});