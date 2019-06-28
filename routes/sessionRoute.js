//imports
const express = require('express');
const router = express.Router();
const passport = require("passport");

/* Get login page */
router.get('/login', function(req, res, next){
  res.render('login', { title: "Ujumbe", req: req, errors: req.flash("err"), successMessages: req.flash("success")});
});

// Post login
router.post('/login',passport.authenticate('local',{failureRedirect: "/login", failureFlash: true}),(req, res)=>{
    let redirectUrl = req.session.originalUrl || '/';
    req.session.originalUrl = null;
    res.redirect(redirectUrl);
});

//logout endpoint
router.get("/logout", function(req, res, next){
   req.logout();
   res.redirect('/');
});

module.exports.sessionRouter = router;
