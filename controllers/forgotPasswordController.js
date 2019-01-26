const userModel = require('../models/usersModel');


module.exports = function(req, res, next){

    userModel.findOne({email: req.body.email}, function(err, user){
      if(err){
        console.log(err);
        return next(err)
      }else{
        if(!user){
          req.flash("err", "User With that email does not exist");
          res.redirect("/forgotPassword");
        }else{
          console.log(user);
          res.send(user);
        }
      }
    });
};
