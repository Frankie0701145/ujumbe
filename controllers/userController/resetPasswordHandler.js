//Controller to fire the check the return reset link is valid

const jwt = require("jsonwebtoken");
const userModel = require('../../models/userModel');


module.exports =  function(req, res, next){
  let token = req.params.accesstoken
  if(req.params.accesstoken){
    let secrete = process.env.JWT_KEY;
    jwt.verify(token, secrete , function(err,decoded){
        if(err){
          switch(err.name){
            case "TokenExpiredError":
              console.log("TokenExpiredError");
              req.flash("err", "The password reset link has expired please request a new one");
              res.redirect("/forgotPassword");
              break;
            case "JsonWebTokenError":
              console.log("JsonWebTokenError");
              req.flash("err", "The password reset link is invalid/broken");
              res.redirect("/forgotPassword");
              break;
            default:
              req.flash("err", "something went wrong request a new link");
              res.redirect("/forgotPassword");
          }

        }else if (decoded) {
          userModel.findById(decoded.id, function(err, user){
            if(err){
              console.log(err);
            }else{
              res.render("resetPassword",{
                req: req,
                email: user.email,
                errors: req.flash("err"),
                successMessages: req.flash("success")
              });
            }
          });
        }
    });
  }else{
    req.flash("err", "There is no access token");
    res.redirect("/forgotPassword");
  }
};
