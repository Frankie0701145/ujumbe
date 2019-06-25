const faker = require('faker');
const newsmodel = require("../models/newsModel");

module.exports = function(req, res,next ){

    for(let x=0; x<5; x++){
        let comment = [{
          comment: faker.lorem.sentences,
          newsId: "5cc0733620b2bd3a1973b47c",
          userId: "5cc070c0c41dbc378bcacee3"
        }];
      newsmodel.update(
        {_id:"5cc0733620b2bd3a1973b47c"},
        {$push: {comments: comment}}
      )
    }
    res.send("saved");
};
