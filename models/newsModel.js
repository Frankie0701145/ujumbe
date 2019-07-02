
const Geojson = require('mongoose-geojson-schema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const geocoder= require("../config/init/nodeGeocoderInit").geocoder;
const Schema = mongoose.Schema;

// news schema
  const newsSchema = new Schema ({
          title:{
            type: String,
            required: [true, "The title is required"]
          },
          text: {
            type: String,
            required: [true, "The news body is required"]
          },
          agree: {
            type: Number
          },
          disagree: {
            type: Number
          },
          commentNo: {
            type: Number,
            default: 0
          },
          coordinates: {
            type:{
              type: String,
              default: 'Point',
            },
            coordinates: {
              type: [Number, Number],//lon, lat
              required : [true, "The news coordinates is required"],
              index: '2dsphere'
            }
          },
          comments:[{
            type: Schema.Types.ObjectId, ref: "Comment"
          }],
          user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "The user id is required"]
          }
      },
      {timestamps: true}
   );

const News = mongoose.model("News", newsSchema);
module.exports = News;
