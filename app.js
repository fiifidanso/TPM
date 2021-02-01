const express = require("express");
const app = express()

const port = 8080; //port for listening

const bodyParser = require("body-parser");

const { Sequelize, DataTypes } = require('sequelize');

const config = require(`${__dirname}/config/config.js`);
const databases = Object.keys(config.databases);
const db = {};

// configure app
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

for(let i = 0; i < databases.length; ++i) {
    let database = databases[i];
    let dbPath = config.databases[database];
    db[database] = new Sequelize( dbPath.dbName, dbPath.username, dbPath.password, dbPath );

    try {
     db[database].authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


app.get('/', (req, res) => {
    res.send("Hello");
});

app.get('/login', (req, res) => {
    res.render('index');
});

app.post('/login', (req, res) => {
    var userData = req.body;

    let email = userData.email;
    let password = userData.password;


    // if email exists 
    // then check password agains password
    // else send error to ui

    res.render('index');
});

app.listen(port, ()=> {
    console.log(`Application started: listening on port ${port}`)
});