const config = require('config');
const NodeGeocoder = require('node-geocoder');


const options = {
  // provider: 'google',
  provider: "openstreetmap",

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  // apiKey: config.get("GoogleApiKey.key"), // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

module.exports.geocoder = NodeGeocoder(options);
