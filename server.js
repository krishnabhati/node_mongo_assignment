const express = require('express')
const bodyParser = require('body-parser')
var mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 5000;
var md5 = require('md5');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const url= "mongodb://localhost:27017/users";
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit(); 
});

require('./routes/user.route')(app);
app.listen(9000, ()=>{
    console.log("server Started on 9000")
})