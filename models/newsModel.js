
const Geojson = require('mongoose-geojson-schema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const geocoder= require("../config/init/nodeGeocoderInit").geocoder;
const Schema = mongoose.Schema;

// news schema
  const newsSchema = new Schema ({
          text: {
            type: String,
            required: true
          },
          userId: {
            type: String,
            required: true
          },
          likes: {
            type: Number
          },
          dislikes: {
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
          }
      },
      {timestamps: true}
   );

const News = mongoose.model("news", newsSchema);
module.exports = News;
