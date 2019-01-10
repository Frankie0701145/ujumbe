
const Geojson = require('mongoose-geojson-schema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const geocoder= require("../config/init/nodeGeocoderInit");
const Schema = mongoose.Schema;

const usersSchema =  new Schema({
    firstName: {
      type: String,
      required: [true, 'The first name is required']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'The email address is required']
    },
    lastName: {
      type: String,
      required: [true, 'The last name is required']
    },
    phoneNumber: {
      type: String,
      required: [true, 'The phone Number is required']
    },
    homeAddress: {
      type: String,
      required: [true, 'The home address is required']
    },
    workAddress: {
      type: String,
      required: [ true, 'The work address is required']
    },
    homeCoordinates: {
      type:{
        type: String,
        default: 'Point',
      },
      coordinates: {
        type: [Number, Number],
        // required : [true, "The home address did not geocode properly try again later"],
        index: '2dsphere'
      }
    },
    workCoordinates: {
      type:{
        type: String,
        default: 'Point',
      },
      coordinates: {
        type: [Number, Number],
        // required : [true, "The work address did not geocode properly try again later"],
        index: '2dsphere'
      }
    },
    password: {
      required: [true, "The password is required"],
      type: String
    }
});

usersSchema.pre('save', function(next){
    const user = this;
    if(this.isModified("password")){
      bcrypt.hash(user.password, 10, function(err,hash){
        if(err){
          console.log(err);
          return next(err);
        }else{
            user.password = hash;
            next();
        }
      });
    }
});

 // method to hash and takes the this obj and call back function
function hashing(user){
  bcrypt.hash(user.password, 10, function(err, hash){
    if (err){
      console.log(err);
    }
    console.log("Hashed password is");
    console.log(hash);
    user.password = hash;
  });
}

const User = mongoose.model('users', usersSchema);

module.exports = User;
