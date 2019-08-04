//controller to signup the s

const userModel = require('../../models/userModel');
const sendActivationEmail =  require("../../helpers/sendActivationEmail");

//returns the params that are required
function signUpParams(req){
  let signUpParams = {
      email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber, password: req.body.password
   };
  return signUpParams;
}

//signup controller
module.exports = function(req, res, next){
      // make sure the password and password confirmation do match
      if(req.body.password !== req.body.passwordConfirmation){
        res.render('signup',{
          req: req,
          validationErrors: [{message:"Password and Confirmation Password don't match"}]
        });
      }
      else{
          let user = userModel.findOne({email:req.body.email}, function(err, user){
            if(err){
              console.log(err);
              return next(err);
            }else{
              //make sure there is no user with that email
              if (user){
                  console.log(user);
                  res.render('signup',{
                    req: req,
                    validationErrors: [{message:"That email is already taken"}]
                  });
              }
              //continue if there is no use with that email
              else{
                  let params = signUpParams(req);
                  userModel.create(params, function(err, user){
                      //if there is no error in signing up the user
                      if (err){
                        console.log(err);
                        let errors = []
                        for(errName in err.errors){
                          errors.push({message:err.errors[errName].message});
                        }
                        //change to redirect later on
                        res.render('signup',{
                          req: req,
                          validationErrors: errors});
                      }
                      //if not
                      else{
                        sendActivationEmail(user, req, function(err, json){
                            if(err){
                              console.log(err);
                            }else{
                              req.login(user, function(err){
                                if(err){
                                  console.log(err);
                                }else{
                                  console.log("Activation email sent");
                                  req.flash("success",`Activation link has been sent to this email ${user.email}`);
                                  res.redirect("/");
                                }
                              });
                            }
                        });
                      }
                  });
              }
            }
          });
      }
};
