const User = require("../models/usersModel");
const userModel = require('../models/usersModel');

//signup controller
module.exports.signup = function(req, res, next){
      // make sure the password and password confirmation do match
      if(req.body.password !== req.body.passwordConfirmation){
        res.render('signup',{title: 'UjamaaWatch', req: req, errors: [{message:"Password and Confirmation Password don't match"}]});
      }
      else{
          let user = userModel.findOne({email:req.body.email}, function(err, user){
            console.log(err);
            // making sure email is not already taken
            if (user){
                console.log(user);
                res.render('signup',{title: 'UjamaaWatch', req: req, errors: [{message:"That email is already taken"}]});
            }
            else{
                let params = signUpParams(req);
                userModel.create(params, function(err, doc){
                    if (err){
                      let errors = []
                      for(errName in err.errors){
                        errors.push({message:err.errors[errName].message});
                      }
                        res.render('signup',{title: 'UjamaaWatch', req: req, errors: errors});
                    }
                    else{
                      console.log("saved successfully");
                    }
                });
            }
          });
      }
};

//returns the params that are required
function signUpParams(req){
  signUpParams = {
      email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber, password: req.body.password,
      workAddress:req.body.workAddress
   };
  return signUpParams;
}
