//controller to signup the s

const userModel = require('../models/usersModel');

//returns the params that are required
function signUpParams(req){
  let signUpParams = {
      email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber, password: req.body.password,
      workAddress:req.body.workAddress,
      homeAddress:req.body.homeAddress
   };
  return signUpParams;
}

//signup controller
module.exports = function(req, res, next){
      // make sure the password and password confirmation do match
      if(req.body.password !== req.body.passwordConfirmation){
        res.render('signup',{title: 'UjamaaWatch', req: req, errors: [{message:"Password and Confirmation Password don't match"}]});
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
                  res.render('signup',{title: 'UjamaaWatch', req: req, errors: [{message:"That email is already taken"}]});
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
                          res.render('signup',{title: 'UjamaaWatch', req: req, errors: errors});
                      }
                      //if not
                      else{
                        req.login(user, function(err){
                          if(err){
                            console.log(err);
                          }else{
                            req.flash("success","Signed up successfully");
                            res.redirect("/");
                          }

                        });
                      }
                  });
              }
            }
          });
      }
};
