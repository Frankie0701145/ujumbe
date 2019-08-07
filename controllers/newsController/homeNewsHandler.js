const newsModel = require("../../models/newsModel");
const userModel = require("../../models/userModel");

module.exports = (req, res, next)=>{
  let perpage = 20;
  const allLocations = req.user.locations;

  let homeObjectIndex = allLocations.findIndex(x => x.home);
  let homeLocation = allLocations[homeObjectIndex];

  if(homeLocation){
    allLocations.splice(homeObjectIndex, 1);
    let homeLon = homeLocation.coordinate.coordinate[0];
    let homeLat = homeLocation.coordinate.coordinate[1];
    newsModel.find(
        {
          "coordinate.coordinate":{
            "$geoWithin":{"$center":[[homeLon, homeLat],0.3/3963.2]}
          }
        }
    ).populate('user', "firstName lastName")
     .sort({createdAt: "descending"})
     .limit(perpage)
     .exec()
     .then((news)=>{
       res.render('locationNews',{
          errors: req.flash("err"),
          successMessages: req.flash("success"),
          req: req,
          allLocations: allLocations,
          news: news,
          currentLocation: homeLocation
        });
     }).catch((err)=>{
       console.log(err);
       res.status(504).send();
     });
  }else{
      console.log("No home location");
      res.status(404).send();
  }
};
