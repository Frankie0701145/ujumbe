
const jwt = require("jsonwebtoken");
const userModel = require('../../models/userModel');


module.exports =  function(req, res, next){
    let token = req.params.accesstoken;
    let secrete = process.env.JWT_KEY;

    jwt.verify(token, secrete , function(err,decoded){
          //will rectify later
          if(err){
            switch(err.name){
              case "JsonWebTokenError":
                console.log("JsonWebTokenError");
                req.flash("err", "The account activation link is invalid/broken");
                res.redirect("/");
                break;
              default:
                req.flash("err", "Something went wrong request a new activation link");
                res.redirect("/");
            }
          }else if(decoded){
            userModel.findById(decoded.id, function(err, user){
              if(err){
                console.log(err);
              }else{
                user.activated = true;
                user.save(function(err, updatedUser){
                  if(err){
                    console.log(err);
                  }else{
                    req.flash('success', "Account Activated Successfull");
                    res.redirect("/");
                  }
                });
              }
          });
        }
    });
};
