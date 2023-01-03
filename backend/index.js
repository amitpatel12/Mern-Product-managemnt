const express = require('express');
const app = express();
const cors = require('cors');
require('./db/config.js')
const User = require('./db/User.js')
const Product = require('./db/Product.js')

const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm'

app.use(express.json())
app.use(cors())
app.post('/register', async (req, res) => {
    let user =  new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    Jwt.sign({ result }, jwtKey,{ expiresIn: "12h"}, (err, token) =>{
        if(err){
            res.send({result: "something went wrong, please try after sometime"})
        }
        res.send({result, auth: token})
    })
})

app.post('/login', async (req, res) => {
    console.log(req.body)
    if(req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if(user){
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h"}, (err, token) =>{
                if(err){
                    res.send({result: "something went wrong, please try after sometime"})
                }
                res.send({user, auth: token})
            })
            
        }
        else{
            res.send({result: 'No User Found'})
        }
    }
    else{
        res.send({result: 'No User Found'})
    }
})


app.post('/add-product', verifyToken, async (req, res) => {
    let product = await Product(req.body)
    let result = await product.save()
    res.send(result)
})

app.get('/products/:id', verifyToken, async (req, res) => {
    // let products = await Product.find({userId: req.body});
    let id = req.params.id;
    let products = await Product.find({userId:id});

    if(products.length > 0){
        res.send(products)
    }
    else{
        res.send({result:"No Product found"})
    }
})

app.delete('/product/:id', verifyToken, async (req, res) => {
    // res.send("working")
    // res.send(req.params.id);
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result)
})


app.get('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.findOne({_id:req.params.id})
    if(result)
        res.send(result)
    else
        res.send({result:'No Record Found'})
})

app.put('/product/:id', verifyToken, async(req, res) =>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )

    res.send(result)
})

app.get('/search/:key', verifyToken, async (req, res) => {
    let result = await Product.find({
        $or: [
            {name : {$regex: req.params.key}},
            {company : {$regex: req.params.key}},
            {category : {$regex: req.params.key}}

        ]
    })
    res.send(result)
});

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    // console.log(token)
    if(token){
        token = token.split(" ")[1];
        console.log("middleware called if", token)
        Jwt.verify(token, jwtKey, (err, valid) => {
            if(err){
                res.status(401).send({result: "Please provide valid token"})
            }
            else{
                next();
            }
        })
    }else{
        res.status(403).send({result: "Please add token with header"})
    }
    // console.log("middleware called")
   
}

app.listen(8080);