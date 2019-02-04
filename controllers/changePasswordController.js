const userModel = require('../models/usersModel');

function changePasswordParams(req){
    let changePasswordParams = {
      password: req.body.password
    }
    return changePasswordParams;
}

module.exports = function(req, res, next){
      console.log("changing Password");
      let params =  changePasswordParams(req);

      if(req.body.password !== req.body.passwordConfirmation){
        console.log("passwords dont match");
        req.flash("err", "Password and Password Confirmation don't match");
        res.render("resetPassword",{title: 'UjamaaWatch', req: req, email: req.body.email, errors: req.flash("err"), successMessages: req.flash("success")});
      }else{
        console.log("passwords do match");
        userModel.findOne({email: req.body.email}, function(err, user){
          if(!user){
            console.log(err);
            req.flash("err", "User with that email could not be found");
            res.render("resetPassword",{title: 'UjamaaWatch', req: req, email: req.body.email, errors: req.flash("err"), successMessages: req.flash("success")});
          }else{
            user.password = changePasswordParams(req).password;
            user.save(function(err, user){
                if(err){
                  console.log(err);
                  let errors = [];
                  for(errName in err.errors){
                      errors.push({message:err.errors[errName].message});
                  }
                  res.render("resetPassword",{title: 'UjamaaWatch', req: req, email: req.body.email, errors: errors, successMessages: req.flash("success")});
                }else{
                  console.log("saved");
                  req.flash("success", "Password Changed successfully");
                  res.redirect("/");
                }
            });
          }
        });
      }
};
