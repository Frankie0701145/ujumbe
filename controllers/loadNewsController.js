const newsModel = require("../models/newsModel");
//loadComment by news id
module.exports = function(req, res, next){
      let newsId =  req.params.id
      newsModel.findById(newsId).populate("comments").sort({createdAt: "descending"}).exec(function(err, news){
        if(err){
          console.log(err);
        }else{
          console.log(news);
        }
      });
};
