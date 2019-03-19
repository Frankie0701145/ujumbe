const newsModel = require("../models/newsModel");

module.exports = function(req, res, next){
  let perpage = 20;
  // let page =  req.query.page;
  res.format({
      //when a user request for a html
      "text/html": function() {

          newsModel.find({
                "coordinates.coordinate":{
                  "$geoWithin": {"$centerSphere":[[req.query.lon, req.query.lat], 0.3/3963.2]}
                }
          }).populate('user', "firstName lastName").sort({createdAt: "descending"}).limit(perpage).exec(function(err, news){
            if(err){
              console.log(err);
              return err
            }else{
              let currentLocationCoord = {lon:req. query.lon, lat: req.query.lat}
              let locationsDetails = [
                {locationName: req.user.homeAddress,  lon: req.user.homeCoordinate.coordinate[0], lat: req.user.homeCoordinate.coordinate[1] },
                {locationName: req.user.workAddress, lon: req.user.workCoordinate.coordinate[0], lat: req.user.workCoordinate.coordinate[1]}
              ];
              console.log(news.length);
              res.render('locationNews', { title: 'UjamaaWatch', errors: req.flash("err"), successMessages: req.flash("success"),
                          req: req, locationsDetails: locationsDetails, news: news, currentLocationCoord: currentLocationCoord
              });
            }
          });
      },
      //When the user request for a json
      "application/json": function(){
        let pageNo = req.query.pageNo;
        console.log(pageNo);
        newsModel.find({
          "coordinates.coordinate":{
            "$geoWithin": {"$centerSphere":[[req.query.lon, req.query.lat], 0.3/3963.2]}
          }
        }).populate('user', "firstName lastName").sort({createdAt: "descending"}).limit(perpage).skip(perpage*pageNo).exec(function(err, news){
          if(err){
            console.log(err);
            res.json(500,err);
          }else{
              if(news.length > 1){
                console.log(news.length);
                res.json(news);
              }else{

              }
          }
        });
      }
  });
};
