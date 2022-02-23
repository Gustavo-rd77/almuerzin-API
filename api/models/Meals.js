const  mongoose = require('mongoose');
const Schema = mongoose.Schema //para crear y definir nuestros modelos 

const Meals = mongoose.model('Meal', new Schema({
    name: String,
    desc: String
}));

module.exports = Meals;
