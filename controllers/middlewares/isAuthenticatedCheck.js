

  module.exports = function(req, res, next){

      if(req.user){//if the user is logged in
        next();
      }else{// if the user is not logged in
        res.redirect("/login");
      }
  };
