const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid:String,
    username:String,
    settings:Object,
    data:Object
});

module.exports = mongoose.model('users',userSchema);