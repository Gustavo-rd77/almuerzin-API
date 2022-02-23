const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const meals = require('./routes/meals'); // objeto que tiene nuestras rutas
const orders = require('./routes/orders'); // objeto que tiene nuestras rutas
const auth = require('./routes/auth'); 

const app = express();
app.use(bodyParser.json());
app.use(cors());
// process.env nos permite acceder a las variables de entorno 
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true});


app.use('/api/meals',meals);
app.use('/api/orders',orders);
app.use('/api/auth', auth);

// app.get('*',(req,res)=>{
//     res.send('Chanchito feliz');
// });
// PASSWORD DB MONGO: 4gelT2CzJJ5JjP7T

module.exports = app
