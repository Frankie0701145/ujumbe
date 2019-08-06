const newsModel = require("../../models/newsModel");
const userModel = require("../../models/userModel");

module.exports = (req,res,next)=>{
  let perpage = 20;
  const allLocations = req.user.locations;
  let locationId = req.params.locationId
  let locationIndex = allLocations.findIndex(x => x.id== req.params.locationId);
  let location = allLocations[locationIndex];
  let locationLon = location.coordinate.coordinate[0];
  let locationLat = location.coordinate.coordinate[1];
  if(location){
    allLocations.splice(locationIndex, 1);
    newsModel.find(
      {
        'coordinate.coordinate':{
          '$geoWithin':{
            '$center':[[locationLon, locationLat], 0.3/3963.2]
          }
        }
      }
    ).populate('user',"firstName lastName")
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
          currentLocation: location
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
