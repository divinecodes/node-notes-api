const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    email: String, 
    password: String, 
    permissionLevel: Number
});

module.exports = mongoose.model('Users', userSchema);

