const newsModel = require("../../models/newsModel");
const userModel = require("../../models/userModel");

module.exports = (req, res, next)=>{
    res.format({
      "text/html": htmlRequest
    })
};


const htmlRequest = (req, res, next)=>{
  let perpage = 20;
  const allLocations = req.user.locations;

  let homeObjectIndex = allLocations.findIndex(x => x.home == true);
  let homeLocation = allLocations[homeObjectIndex];

  if(homeLocation){
    allLocations.splice(homeObjectIndex, 1);
    console.log(allLocations);
    let homeLon = homeLocation.coordinate.coordinate[0];
    let homeLat = homeLocation.coordinate.coordinate[1];
    newsModel.find(
        {
          "coordinate.coordinate":{
            "$geoWithin":{"$centerSphere":[[homeLon, homeLat],0.3/3963.2]}
          }
        }
    ).populate('user', "firstName lastName")
     .sort({createdAt: "descending"})
     .limit(perpage)
     .exec()
     .then((news)=>{
       console.log("Length");
       console.log(news.length);
       res.render(
          'homeLocationNews',
          {title: "Ujumbe", errors: req.flash("err"),successMessages: req.flash("success"),
           req: req, allLocations: allLocations, news: news, homeLocation: homeLocation
          }
       );
     }).catch((err)=>{
       console.log(err);
     });
  }else{
      console.log("No home location");
  }
}
