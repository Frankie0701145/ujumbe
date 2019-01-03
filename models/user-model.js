
const Geojson = require('mongoose-geojson-schema');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema =  new Schema({
    firstName: {
      type: 'String',
      required: [true, 'the first name is required']
    },
    email: {
      type: 'String',
      required: [true, 'the email address is required']
    },
    lastName: {
      type: 'String',
      required: [true, 'the last name is required']
    },
    phoneNumber: {
      type: 'String',
      required: [true, 'the phone Number is required']
    },
    homeAddress: {
      type: 'String',
      required: [true, 'the home address is required']
    },
    workAddress: {
      type: 'String',
      required: [ true, 'the work address is required']
    },
    homeCoordinates: {
      type:{
        type: 'String',
        default: 'Point',
      },
      coordinates: {
        type: [Number, Number],
        required : true,
        index: '2dsphere'
      }
    },
    workCoordinates: {
      type:{
        type: 'String',
        default: 'Point',
      },
      coordinates: {
        type: [Number, Number],
        required : true,
        index: '2dsphere'
      }
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
