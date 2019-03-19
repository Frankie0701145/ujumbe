
const Geojson = require('mongoose-geojson-schema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const geocoder= require("../config/init/nodeGeocoderInit").geocoder;
const Schema = mongoose.Schema;

const userSchema =  new Schema({
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
    homeCoordinate: {
      type:{
        type: String,
        default: 'Point',
      },
      coordinate: {
        type: [Number, Number], //lon, lat
        // required : [true, "The home address did not geocode properly try again later"],
        index: '2dsphere'
      }
    },
    workCoordinate: {
      type:{
        type: String,
        default: 'Point',
      },
      coordinate: {
        type: [Number, Number], //lon, lat
        // required : [true, "The work address did not geocode properly try again later"],
        index: '2dsphere'
      }
    },
    password: {
      required: [true, "The password is required"],
      type: String
    },
    activated: {
      type: Boolean,
      default: false
    },
    news: [{type: Schema.Types.ObjectId, ref: 'News'}],
},{timestamps: true});
//hashing the password
userSchema.pre('save', function(next){
    var user = this;
    if(this.isModified("password")){
      console.log("************Hashin Hashing***********");
      hashing(user, next);
    }else{
      next();
    }
});

//home address geocoding
userSchema.pre('save', function(next){
    var user = this;
    if(this.isModified("homeAddress")){
        geocoder.geocode(user.homeAddress, function(err,res){
          if(err){
            console.log(err);
            return next(err);
          }else{
            if(res){
              user.homeCoordinate.coordinate = [ res[0].longitude, res[0].latitude ];
              console.log("************Home Geocoding***********");
              console.log(res);
              console.log(user.homeCoordinate.coordinate);
              next();
            }else{
              console.log("Home location could not be found");
              next();
            }
          }
        });
    }else{
      next();
    }

});
//work address geocoding
userSchema.pre('save', function(next){
    var user = this;
    if(this.isModified("workAddress")){
        geocoder.geocode(user.workAddress, function(err,res){
          if(err){
            console.log(err);
            return next(err);
          }else{
            if(res){
              user.workCoordinate.coordinate = [ res[0].longitude, res[0].latitude ];
              console.log("************Work Geocoding***********");
              console.log(res);
              console.log(user.workCoordinate.coordinate);
              next();
            }else{
              console.log("Work location could not be found");
              next();
            }
          }
        });
    }else{
      next();
    }

});

//method to compare the password and the submitted password
userSchema.methods.validatePassword = function(password){
      console.log("validating password");
      return bcrypt.compareSync(password, this.password);
};

// method to hash and takes the this obj and call back function
function hashing(user, cb){
  bcrypt.hash(user.password, 10, function(err, hash){
    if (err){
      console.log(err);
      return cb(err);
    }
    user.password = hash;
    console.log("Hashed Hashed");
    console.log(user.password);
    cb();
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
