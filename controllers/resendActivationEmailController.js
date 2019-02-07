    const sendActivationEmail =  require("../helpers/sendActivationEmail");

    module.exports = function(req, res, next){
      let user = req.user;
      sendActivationEmail(user, req, function(err, json){
          if(err){
            console.log(err);
          }else{
            console.log("Resent the email account activation");
            req.login(user, function(err){
              if(err){
                console.log(err);
              }else{
                console.log("Activation email sent");
                req.flash("success",`Activation Link has been sent to your this email ${user.email}`);
                res.redirect("/");
              }
            });
          }
      });
    };
