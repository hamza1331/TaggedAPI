//Imports
const express = require('express')
const app = express()
const process = require('process')
const bodyParser = require('body-parser')
const mongooose = require('mongoose')
const User = require('./models/User')
const port = process.env.PORT || 8000
app.use(bodyParser.json())  //Body Parser MiddleWare
app.use(express.json())
mongooose.connect('mongodb://demo:demo123@ds125372.mlab.com:25372/demo_dreamerz',{useNewUrlParser:true}) //MongoDB connection using Mongoose
var db = mongooose.connection //Mongo Connection Instance
db.on('open',()=>console.log('database connected'))
app.get('/',function(req,res){  //HomePage for API
    res.send('Hello world form Bookapp...')
})
app.post('/api/addUser',(req,res)=>{
    let data = req.body
    console.log(data)
    if(data){
        User.create(data,(err,user)=>{
            if(err)
                res.json({error:err})
            else
            res.json(user)
        })
    }
    else
    res.json({error:"Fill al required fields"})
})


//Server
app.listen(port,function(){
    console.log('Listening on port'+port)
})