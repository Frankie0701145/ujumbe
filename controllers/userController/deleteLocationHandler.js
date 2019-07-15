const userModel = require("../../models/userModel");


module.exports = (req, res, next)=>{

  userModel.findById(req.user.id).then((user)=>{
    let userLocation = user.locations.id(req.params.id);
    if(userLocation){
      userLocation.remove();
      user.save().
        then((user)=>{
          req.flash("success", "Location deleted successfully");
          res.redirect("/addLocation");
        }).
        catch((err)=>{
          console.log("The location did not delete");
          next(err);
        });
    }else{
      req.flash("err", "That location is not present");
      res.redirect("/addLocation");
    }
  });
};
