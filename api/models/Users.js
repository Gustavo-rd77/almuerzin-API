const  mongoose = require('mongoose');
const Schema = mongoose.Schema //para crear y definir nuestros modelos 

const Users = mongoose.model('User', new Schema({
    email : String,
    password: String,
    salt : String,
    role:   {type: String, default: 'user'} //admin
}));

module.exports = Users;