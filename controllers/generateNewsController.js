const faker = require('faker');
const News = require("../models/newsModel");
module.exports =  function(req, res, next){
  for(let x=0; x<20; x++){

      let news = {
        title: faker.name.title(),
        text: faker.lorem.sentences(),
        address: faker.address.streetAddress(),
        coordinates:{coordinate: [36.0726294574634, -0.3021589]},
        user: "5cc070c0c41dbc378bcacee3"

      }
      News.create(news, function(err, doc){
        if(err){
          console.log(err);
          return err
        }
        console.log("saved succefully");
        console.log(doc);
      });
  }
  res.send("saved");
};
