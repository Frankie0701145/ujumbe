

  module.exports = function(req, res, next){

      if(req.user){//if the user is logged in
        next();
      }else{// if the user is not logged in
        //saves the previously visited url which needed one to be logined so that they will be redirect back to the url after logiging.
        req.session.originalUrl = req.originalUrl.toString();
        res.redirect("/login");
      }
  };
