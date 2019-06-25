
const Geojson = require('mongoose-geojson-schema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const geocoder= require("../config/init/nodeGeocoderInit").geocoder;
const Schema = mongoose.Schema;

// news schema
  const newsSchema = new Schema ({
          title:{
            type: String,
            required: true
          },
          text: {
            type: String,
            required: true
          },
          agree: {
            type: Number
          },
          disagree: {
            type: Number
          },
          commentNo: {
            type: Number,
            required: true,
            default: 0
          },
          address: {
            type: String,
            required: [true, 'The address is required']
          },
          coordinates: {
            type:{
              type: String,
              default: 'Point',
            },
            coordinate: {
              type: [Number, Number],//lon, lat
              // required : [true, "The work address did not geocode properly try again later"],
              index: '2dsphere'
            }
          },
          comments:[{
            type: Schema.Types.ObjectId, ref: "Comment"
          }],
          user:{type: Schema.Types.ObjectId, ref: 'User'}
      },
      {timestamps: true}
   );

const News = mongoose.model("News", newsSchema);
module.exports = News;
