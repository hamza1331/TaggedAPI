const mongoose = require('mongoose');
const UserPostsSchema = new mongoose.Schema({
  userId:{
      type:String,
      required:true
  },
  PostsID:{
      type:[String]   //Array of PostIDs
  }
});

module.exports = mongoose.model('PostsByUser', UserPostsSchema);