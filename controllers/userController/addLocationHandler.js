const userModel = require('../../models/userModel');

module.exports = (req, res, next)=>{

  userModel.findById(req.user.id).then((user)=>{
       user.geocode(req.body.address, (err, result)=>{
         if(err){
           console.log("error at geocoding");
           console.log(err);
         }else{
           console.log("geocoded");
           console.log(result);
           if(result && result.length > 0){
             console.log(req.body.address);
             user.locations.push({
               address: req.body.address,
               coordinate: {
                 coordinate: [result[0].longitude, result[0].latitude]
               }
             });
             console.log(user.locations);
             user.save((err)=>{
               if(err){
                 console.log(err);
               }else{
                 req.flash('success', 'Location Added successfully.')
                 res.redirect("/addLocation");
               }
             });
           }else{
             req.flash('err',"Could not geocode make sure to type the location properly following the correct format of Location, City, Country. If this issue persist try later or change the name of the address. Thank you.");
             res.redirect("/addLocation");
           }
         }
       });
  }).catch((err)=>{
    console.log(err);
    res.status(500).send();
  });
};
