const mongoose = require('mongoose');
const ActivitySchema = new mongoose.Schema({
  userId:{
      type:String,
      required:true
  },
  likes:{
      type:[String]
  },
  liked:{
      type:[String]
  },
  love:{
      type:[String]
  },
  favorites:{
      type:[String]
  }

});

module.exports = mongoose.model('Activity', ActivitySchema);