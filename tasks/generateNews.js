'use strict';
const faker = require('faker');
const path = require('path');
const mongoose = require('mongoose');
const News = require("../models/newsModel");
const number = process.argv[4] || 10;
const lon = process.argv[2];
const lat = process.argv[3];

if(!(lat) || !(lon)){
  console.error("Pleas provide the lon lat");
  console.error("The format of the call should be: 'node generateNews lon lat number'");
  console.error("Where Lon is the longitude, lat is the latitude and number is the number of news to generate");
  process.exit(1);
}

const pathTo = `${process.cwd()}/..`;
let pathOfEnvFile = path.resolve(pathTo, ".env");
require('dotenv').config({ path: pathOfEnvFile });

mongoose.connect(process.env.MLAB_URL,{useNewUrlParser: true,useCreateIndex: true})
    .then(()=>{
        console.log("Connected to mlab successfully");
        let newsArray = [];
        let news;
        for(let x=0; x<number; x++){
          news = {
              title: faker.name.title(),
              text: faker.lorem.sentences(),
              coordinate:{coordinate: [lon, lat]},
              user: "5d13502b2984581cdb87c11c"
          }
          newsArray.push(news);
        }
        News.insertMany(newsArray).then((docs)=>{
            console.log("saved");
            console.log(docs);
            process.exit();
        }).catch((err)=>{
          console.error(err);
          process.exit(1);
        })
    })
    .catch((err)=>{
      console.error(err);
      process.exit(1);
    });

//closin the mongoose connection
process.on('exit', (code)=>{
  console.log("Bye Bye Bye");
  mongoose.connection.close();
});
