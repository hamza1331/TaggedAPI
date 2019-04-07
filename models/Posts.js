const mongoose = require('mongoose');
const commentsSchema = new mongoose.Schema({
    text:String,
    userId:String,
    time: {
        type:Date,
        default:new Date()
    }
})
const PostsSchema = new mongoose.Schema({
  userId:{
      type:String,
      required:true
  },
  createdDate:{
      type:Date,
      default:Date.now()
  },
  photoLinks:{
    type:[String]
  },
  type:{
      type:Number,      //0 for normal post, 1 for photo links
      required:true
  },
  likes:{
      type:[String]
  },
  comments:{
      type:[commentsSchema]
  },
  text:{
      type:String,
      required:true
  }

});

module.exports = mongoose.model('Posts', PostsSchema);