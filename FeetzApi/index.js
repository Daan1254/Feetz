
const express = require('express');
const cors = require('cors')


app = express()
app.use(express.json()) // nodig om inputdata in json te verwerken
var mysql = require('mysql');

const dotenv = require('dotenv'); // get config vars

dotenv.config(); // access config var //process.env.TOKEN_SECRET

app.use(cors())

let acces_token = process.env.TOKEN_SECRET

var db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "feetz",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});


app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        res.json(result)
    })
})
app.get("/jobs", (req, res) => {
    db.query("SELECT * FROM jobs", (err, result) => {
        res.json(result)
    })
})

app.get("/getUserchats/:id", (req, res) => {
    let userId = req.params.id
    let returnArray = []
    db.query("SELECT * FROM chat", (err, result) => {
        result.forEach(chat => {
            let allowed_users = JSON.parse(chat.allowed_users)
            allowed_users.users.forEach(user_id => {
                console.log(user_id,  userId)
                if (user_id == userId) {
                    returnArray.push(chat)
                }
            })
        })
        res.json(returnArray)
    })
})

app.post("/createChat", (req, res) => {
    let allowed_users = {"users":[]}
    allowed_users.users[0] = req.body.own_id;
    allowed_users.users[1] = req.body.seller_id;
    db.query(`INSERT INTO chat (allowed_users, messages) VALUES ('${JSON.stringify(allowed_users)}', '${JSON.stringify([])}')`, {}, (result, err) => {
        console.log(err.insertId)
        res.json(err.insertId)
    })
})


app.post("/sendChat", (req, res) => {
    let chat_data = req.body
    console.log(chat_data)
    db.query("SELECT * FROM chat WHERE chat_id = " + chat_data.chat_id, (err, result) => {
        let chat_messages = JSON.parse(result[0].messages)
        let new_chat_data = {
            message: chat_data.message,
            username: chat_data.username,
            date: new Date().toLocaleString()
        }
        chat_messages.push(new_chat_data)
        db.query(`UPDATE chat SET messages = '${JSON.stringify(chat_messages)}' WHERE chat_id = ${chat_data.chat_id}`, {}, (err, result) => {
            db.query("SELECT * FROM chat WHERE chat_id = " + chat_data.chat_id, (err, result) => {
                res.json(result[0].messages)
            })
        })
    })
})


app.get("/getChat/:id", (req, res) => {
    db.query("SELECT * FROM chat WHERE chat_id = " + req.params.id, (err, result) => {
        res.json(result[0])
    })
})
app.get("/users/:username", (req, res) => {
    db.query(`SELECT * FROM users where username = '${req.params.username}'`, (err, result) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*")
        res.json(result)
    })
})



app.get("/account", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        res.json(result[0])
    })
})
app.get("/chats", (req, res) => {
    db.query("SELECT * FROM chat", (err, result) => {
        res.json(result)
    })
})





function authenticateToken(req, res, next) {

    const token = req.headers['authorization']
  
    console.log('token: ', token, acces_token)
  
    if (token == null) return res.sendStatus(401)
  
    if (token != "Bearer "+  acces_token) return res.sendStatus(401)
  
    next()
  
  }
  
  
  const generateAccessToken = async () => {
  
    console.log('generateAccessToken')
  
    const { v4: uuidv4 } = require('uuid');
  
    acces_token = uuidv4();
  
  
  }


  app.listen(8081)