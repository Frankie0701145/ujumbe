


module.exports = function(req, res, next){

      if(req.user){ //user logged in
        if(req.user.activated){//user account activated
            next();
        }else{//user account not activated
            res.redirect("/activateAccount");
        }
      }else{//user not logged in
        next();
      }
}
