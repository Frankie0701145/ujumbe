//Controller to send the reset password link to the email provided
const sendPasswordResetEmail =  require("../helpers/sendPasswordResetEmail");
const userModel = require('../models/usersModel');

module.exports = function(req, res, next){
      console.log("starting sending the reset email");
      userModel.findOne({email: req.body.email}, function(err, user){
        //if err pass the err to the error handler
        if(err){
          console.log(err);
          return next(err)
        }
        //if no error
        else{
          //if their is no user with that email
          if(!user){
            req.flash("err", "User With that email does not exist");
            res.redirect("/forgotPassword");
          }
          //if there is a user with that email
          else{
            sendPasswordResetEmail(user, req, function(err, json){
              if(err){
                console.log(err);
                req.flash("err", `Password Reset link would not be sent to this email. Try again later ${user.email}.`);
                res.redirect("/forgotPassword");
              }else{
                console.log("email sent sucessfully");
                let message = "Password Reset link sent to this email " + user.email;
                req.flash("success", message);
                res.redirect("/forgotPassword");
              }
            });
          }
        }
      });
};
