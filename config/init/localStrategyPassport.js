 const passport= require("passport");
 const LocalStrategy = require("passport-local").Strategy;
 const userModel = require("../../models/usersModel");

passport.serializeUser(function(user,done){
      done(null,user.id);
});

passport.deserializeUser(function(id,done){

    userModel.findById(id, function(err,user){
      if(!err){
        return done(null, user);
      }else{
        console.log(err);
        return done(null, err);
      }
    });
});

passport.use(new LocalStrategy(
    {
      usernameField: "email",
      password:"password",
      passReqToCallback: true
    },
    function(req, email, password, done){
      console.log("Starting authentication");
      // console.log(password);
      // console.log(email);
      //looking if there is a user with that email provided.
      userModel.findOne({email:email},function(err,user){
        if(err){
          console.log(err);
          return done(err);
        }else{
          // console.log(user);
          if(!user){
            req.flash("err", "Login Attempt failed, Invalid Email or password");
            req.session.save(function(){
              return done(null, false);
            });

          }else if(!user.validatePassword(password)){
            //if the password did not validate
            req.flash("err", "Login Attempt failed, Invalid Email or password");
            req.session.save(function(){
              return done(null, false);
            });

          }else{
            //logged in successfully.
            // console.log("Logged in successfully");
            req.flash("success", "Logged in successfully");
            req.session.save(function(){
              return done(null, user);
            });
          }
        }
      });
    }
));
