const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
var md5 = require('md5');

var ReverseMd5 = require('reverse-md5')

var rev = ReverseMd5({
    lettersUpper: false,
    lettersLower: true,
    numbers: true,
    special: false,
    whitespace: true,
    maxLen: 12
  })


exports.createuser = async (req, res) => {
    try {
        //let userName = req.body.username;
        const newuser = new User({
            username: req.body.username,
            password: md5(req.body.password),
            contactno: req.body.contactno,
        });
        // console.log(newuser,"NEWWWWWWWWWWWW");
        let data = await newuser.save();
        res.send({
            data: data
        });
    }
    catch (err) {
        console.log(err, "ERROOOOOOOOOOOOOOOOOOOr");
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
        });
    }
}

exports.findAllusers = async (req, res) => {
    // const username = req.query.username;

    const allusers = await User.find().sort({ created_date: -1 })
    for (let i = 0; i < allusers.length; i++) {
        allusers[i].password = rev(allusers[i].password).str
    }
    res.send({ status: 200, data: allusers });
};

//Task2
exports.login = async (req, res) => {
    let userName = req.body.username;

    const userdata = await User.findOne({ username: userName })
    if (userdata) {
        console.log("userexist")
        if (userdata.password == md5(req.body.password)) {
            console.log("Login successfully")
            let payload = {
                user_id: userdata._id,
                username: userdata.username,
                contactno: userdata.contactno,
            }
            //console.log(payload, "NEWWWWWWWWWWWW");
            let authToken = await jwt.sign(payload, "krishna", { algorithm: "HS256", expiresIn: "30d" });
            res.send({
                msg: "Login Successfully",
                status: 200,
                accessToken: authToken
            })
        } else {
            res.send({
                msg: "Wrong Credintials",
                status: 400
            })
        }
    } else {
        res.send({
            msg: "User Not Found",
            status: 404
        })
    }
    }
//Task3

exports.delete = async (req, res) => {
    try{
    let userids = req.body.userids
let deleteduser =await  User.remove({_id : {'$in' : userids}})
res.send({status : 200,msg : "Users Deleted Successfullt"})
    }catch (err) {
        console.log(err, "ERROr");
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting  User."
        });
    }
};
