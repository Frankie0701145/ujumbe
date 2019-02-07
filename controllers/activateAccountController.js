
const jwt = require("jsonwebtoken");
const userModel = require('../models/usersModel');

module.exports =  function(req, res, next){
    let token = req.params.accesstoken
    let secrete = "secret";

    jwt.verify(token, secrete , function(err,decoded){
          //will rectify later
          if(err){
            switch(err.name){
              case "JsonWebTokenError":
                console.log("JsonWebTokenError");
                req.flash("errActivation", "The account activation link is invalid/broken");
                res.redirect("/activate");
                break;
              default:
                req.flash("errActivation", "Something went wrong request a new activation link");
                res.redirect("/activate");
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
                    res.redirect("/");
                  }
                });
              }
          });
        }
    });
};
