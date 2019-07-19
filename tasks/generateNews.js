'use strict';
const faker = require('faker');
const path = require('path');
const mongoose = require('mongoose');
const News = require("../models/newsModel");
const number = process.argv[2] || 10;

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
              coordinate:{coordinate: [36.0855064, -0.2985643]},
              user: "5d13502b2984581cdb87c11c"
          }
          newsArray.push(news);
        }
        News.insertMany(newsArray).then((docs)=>{
            console.log("saved");
            process.exit();
        }).catch((err)=>{
          console.error(err);
          process.exit
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
