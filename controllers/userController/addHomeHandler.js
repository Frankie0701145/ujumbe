const userModel = require("../../models/userModel");

module.exports = (req, res, next)=>{
    userModel.findById(req.user.id).then((user)=>{
      // console.log(user);
      let proposedHomeLocation = user.locations.id(req.params.id);
      if(proposedHomeLocation && !proposedHomeLocation.home){
          let previousLocationId;
          for(location of user.locations){
            if(location.home){
                previousLocationId = location.id;
                console.log("found it");
                break;
            }
          }
         user.addHomeLocation(proposedHomeLocation.id, previousLocationId, (err,user)=>{
           if(err){
             next(err);
           }else{
             console.log("the saved user");
             req.flash("success", "New location added as home successfully");
             res.redirect("/addLocation");
           }
         });
      }else{
        req.flash('err', 'The location is not present or that location is already defined as your home');
        res.redirect("/addLocation")
      }
    }).catch((err)=>{
      console.log(err);
    });
};
