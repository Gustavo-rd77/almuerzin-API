const express = require('express')
const crypto = require('crypto');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { isAuthenticated } = require('../auth/index'); 

const singToken = (_id) =>{
    return jwt.sign({_id}, 'mi-secreto',{
        expiresIn: 60*60*24*365
    })
}

router.post('/register',(req,res)=>{
    const {email, password} = req.body;
    crypto.randomBytes(16,(err,salt)=>{
        const newSalt = salt.toString('base64');
        crypto.pbkdf2(password, newSalt, 400, 64, 'sha1',(err, key) => {
            const encryptedPassword = key.toString('base64');
            Users.findOne({email}).exec()
            .then(user => {
                if(user){
                    return res.send('El usuario ya existe');
                }
                Users.create({
                    email,
                    password: encryptedPassword,
                    salt: newSalt
                }).then(()=> res.send('usuario creado con éxito'))
            })
        })
        
    })
})
router.post('/login',(req,res)=>{
    const {email, password} = req.body;
    Users.findOne({email}).exec()
    .then( user => {
        if(!user){
            return res.send('La contraseña y/o email es incorrecta');
        }
        crypto.pbkdf2(password, user.salt, 400, 64, 'sha1',(err,key)=>{
            const encryptedPassword = key.toString('base64');
            if(encryptedPassword === user.password){
                const token = singToken(user._id);
                return res.send({ token })
            }else{
                return res.send('La contraseña y/o email es incorrecta');
            }
        })
    })
})

router.get('/me', isAuthenticated, (req,res)=>{
    res.send(req.user);
})
module.exports = router;