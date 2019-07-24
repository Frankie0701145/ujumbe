const newsModel = require("../../models/newsModel");
const userModel = require("../../models/userModel");

module.exports = (req, res, next)=>{
  console.log("the more endPoint");
    let perpage = 20;
    let page =  req.query.pageNo;
    const allLocations = req.user.locations;
    let locationIndex = allLocations.findIndex(x => x.id== req.params.locationId);
    let location = allLocations[locationIndex];
    let homeLon = location.coordinate.coordinate[0];
    let homeLat = location.coordinate.coordinate[1];
    if(location){
      newsModel.find(
        {
          'coordinate.coordinate':{
            "$geoWithin":{"$center":[[homeLon, homeLat],0.3/3963.2]}
          }
        }
      ).populate('user',"firstName lastName")
       .sort({createdAt: "descending"})
       .limit(perpage)
       .skip(perpage*page)
       .exec()
       .then((news)=>{
          console.log(news.length);
          if(news.length == 20){
            return res.json({
              news: news,
              continueOn: true,
              error: false
            });
          }else{
            return res.json({
              news: news,
              continueOn: false,
              error: false
            });
          }
       }).catch((err)=>{
         console.log(err);
         res.status(404).send({
           "error": true
         });
       });
    }else{
      console.log("No location");
      res.status(404).send({
        "error": true
      });
    }
}
