const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email:{
      type:String,
      required:[true,'Email is required']
  },
  fName:{
      type:String,
      rrequired:[true,'First Name is required']
  },
  lName:{
      type:String,
      required:[true,'Last Name is required']
  },
  bDay:{
      type:String,
      required:[true,'Birth Date is required']
  },
  ethnicity:{
      type:String
  },
  gender:{
      type:Number,      //0 for male, 1 for female
      required:[true,'Gender is required'] 
  },
  country:{
      type:String,
      required:[true,'Country name is required']
  },
  city:{
      type:String,
      required:[true,'City Name is required']
  },
  profilePic:{
      type:String,
      required:[true,'Profile Pic link is required']
  },
  relationshipStatus:{
      type:String,
      default:"Single"
  },
  orientation:{
      type:String
  },
  religion:{
      type:String
  },
  about:{
      type:String
  },
  languages:{
      type:[String]
  },
  firebaseUID:{
      type:String
  },
  isLoggedIn:{
      type:Boolean,
      default:false
  }


});

module.exports = mongoose.model('Users', UserSchema);