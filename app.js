var http = require('http')
var mysql = require('mysql')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.sendFile(__dirname + "/form.html")
})

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "example1"
})

con.connect((err) => {
    if(err) throw err

    console.log("database connected")
})

app.post('/add',(req,res) => {
    var username = req.body.username
    var password = req.body.password

    var sql = "INSERT INTO login(username,password) VALUES ('"+username+"','"+password+"')"

    con.query(sql, (err,result) => {
        if(err) throw err

        console.log("data inserted")
    })

    res.redirect('/')

})

app.post('/login',(req,res) => {
    var username = req.body.username
    var password = req.body.password

    var sql = "SELECT * FROM login WHERE username='"+username+"'"

    con.query(sql, (err,result) => {
        if (err) throw err

        if(password === result[0].password)
        res.send("correct password") 
        else
        res.send("incorrect password")
    })
})

app.post('/delete',(req,res) => {
    var username = req.body.username

    var sql = "DELETE FROM LOGIN WHERE username='"+username+"' LIMIT 1"

    con.query(sql, (err,result) => {
        if(err) throw err

        res.send("Account deleted")
    })
})

app.post('/update',(req,res) => {
    var cname = req.body.cname;
    var nname = req.body.nname;

    var sql = "UPDATE login SET username='"+nname+"' WHERE username='"+cname+"'"

    con.query(sql,(err,result) => {
        if(err) throw err

        res.send("Username updated")
    })
})

app.get('/display',(req,res) => {

    var sql = "SELECT * FROM LOGIN"
    
    con.query(sql, (err,result) => {
        if (err) throw err

        res.send(result)
    })
})

app.listen(8080)