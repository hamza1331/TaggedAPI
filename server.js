//Imports
const express = require('express')
const app = express()
const process = require('process')
const bodyParser = require('body-parser')
const mongooose = require('mongoose')
const User = require('./models/User')
const Activity = require('./models/Activity')
const Posts =require('./models/Posts')
const UserPosts = require('./models/UserPosts')
const mongoose = require('mongoose')
const port = process.env.PORT || 8000
app.use(bodyParser.json())  //Body Parser MiddleWare
app.use(express.json())
mongooose.connect('mongodb://demo:demo123@ds125372.mlab.com:25372/demo_dreamerz',{useNewUrlParser:true}) //MongoDB connection using Mongoose
var db = mongooose.connection //Mongo Connection Instance
db.on('open',()=>console.log('database connected'))
app.get('/',function(req,res){  //HomePage for API
    
    res.json({message:'Welcome'})
})
app.post('/api/addUser',(req,res)=>{
    let data = req.body
    if(data){
        const date = data.bDay.split('/')
        const birthDate = new Date(parseInt(date[2]),parseInt(date[1]),parseInt(date[0]))
        const diff_ms = Date.now() - birthDate.getTime()
    const age_dt = new Date(diff_ms); 
    const age =  Math.abs(age_dt.getUTCFullYear() - 1970)
        data.age =  age
        User.create(data,(err,user)=>{
            if(err)
                res.json({error:err})
            else
            {
                let userId = user._id
                Activity.create({userId})
                res.json(user)
            }
        })
    }
    else
    res.json({error:"Fill all required fields"})
})
app.put('/api/updateLikes:id',(req,res)=>{
    Activity.findOne({userId:req.params.id},(err,data)=>{
        if(err)return
        let likes = data.likes
        likes.push(req.body.likes)
        Activity.findOneAndUpdate({userId:req.params.id},{likes},{runValidators:true,new:true},(err,data)=>{
            res.json(data)
        })
    })
})
app.put('/api/updateFavorites:id',(req,res)=>{
    Activity.findOne({userId:req.params.id},(err,data)=>{
        if(err)return
        let favorites = data.favorites
        favorites.push(req.body.favorites)
        Activity.findOneAndUpdate({userId:req.params.id},{favorites},{runValidators:true,new:true},(err,data)=>{
            res.json(data)
        })
    })
})
app.put('/api/updateLiked:id',(req,res)=>{
    Activity.findOne({userId:req.params.id},(err,data)=>{
        if(err)return
        let liked = data.liked
        liked.push(req.body.liked)
        Activity.findOneAndUpdate({userId:req.params.id},{liked},{runValidators:true,new:true},(err,data)=>{
            res.json(data)
        })
    })
})
app.put('/api/updateLove:id',(req,res)=>{
    Activity.findOne({userId:req.params.id},(err,data)=>{
        if(err)return
        let love = data.love
        love.push(req.body.love)
        Activity.findOneAndUpdate({userId:req.params.id},{love},{runValidators:true,new:true},(err,data)=>{
            res.json(data)
        })
    })
})
app.get('/api/getUsers:page',(req,res)=>{
    const query = {
        gender:parseInt(req.query.gender),
        country:req.query.country,
        city:req.query.city,
        relationshipStatus:req.query.relationshipStatus
    }
    console.log(query)    
    var perPage = 10
    var page = req.params.page || 1
    User.find(query).skip((perPage*page)-perPage).limit(perPage).exec((err,data)=>{
        User.estimatedDocumentCount().exec((err, count) => {
            console.log(data)
            if (err) return res.json({message:err})
            res.json({
                users: data,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        })
    }) 
})
app.post('/api/addPost',(req,res)=>{
    const data = req.body
    Posts.create(data,(err,data)=>{
        if(err) return
        UserPosts.findOne({userId:data.userId},(err,posts)=>{
            if (err) return
            if(posts){
                console.log('Before',posts)
                let PostsID = posts.PostsID
                var id = mongoose.Types.ObjectId(data._id)
                PostsID.push(id)
                console.log('After',PostsID)
                UserPosts.findOneAndUpdate({userId:data.userId},{PostsID},{new:true,runValidators:true},(err,reply)=>console.log(reply))
            }
            else{
                let PostsID = []
                PostsID.push(data._id)
                let userposts = {
                    userId:req.body.userId,
                    PostsID
                }
                UserPosts.create(userposts)
            }
        })
        
        res.json(data)
    })
})
//Server
app.listen(port,function(){
    console.log('Listening on port'+port)
})



/*
  FILTERS:
    BY GENDER (DEFAULT : OPPOSITE)
    BY COUNTRY DEFAULT : HOME_COUNTRY
    BY CITY DEFAULT : HOME_CITY
    AGE : DEFAULT 18 - 30
    RELATIONSHIP_STATUS DEFAULT : SINGLE 
 
 */