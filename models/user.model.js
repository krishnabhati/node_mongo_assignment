var mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username : { type: String, trim: true },
    password: { type: String, trim: true },
    contactno : { type: String, trim: true },
    created_time : {type : Date,default : new Date()}
});

module.exports = mongoose.model('users', UserSchema)