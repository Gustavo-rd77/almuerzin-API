const express = require('express')
const Orders = require('../models/Orders')
const router = express.Router();
const {isAuthenticated, hasRole} = require('../auth')

router.get('/',(req,res)=>{
    Orders.find()
        .exec() //exec para ejecutar nuestra query
        .then(x => res.status(200).send(x) )
    
})
router.get('/:id',(req,res)=>{
    Orders.findById(req.params.id)
        .exec() //exec para ejecutar nuestra query
        .then(x => res.status(200).send(x) ) //x tiene el resultado de la query y then se usa por que exec devuelve una promesa

    
})
router.post('/',isAuthenticated,(req,res)=>{
    const {_id} = req.user;

    Orders.create({...req.body, user_id: _id}).then(x => res.status(201).send(x))
    
})
router.put('/:id',isAuthenticated,(req, res) => {
    Orders.findOneAndUpdate(req.params.id, req.body)
        .then(()=> res.sendStatus(204))
})

router.delete('/:id', isAuthenticated,(req,res)=>{
    Orders.findOneAndDelete(req.params.id).exec().then(() => res.sendStatus(204))
})

module.exports = router;