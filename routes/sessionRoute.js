//imports
const express = require('express');
const router = express.Router();
const passport = require("passport");

/* Get login page */
router.get('/login', function(req, res, next){
  // console.log(req.flash("err"));
  res.render('login', { title: "Ujumbe", req: req, errors: req.flash("err"), successMessages: req.flash("success")});
});

// Post login
router.post('/login',passport.authenticate('local',{successRedirect: "/",failureRedirect: "/login", failureFlash: true}));

//logout endpoint
router.get("/logout", function(req, res, next){
   req.logout();
   res.redirect('/');
});

module.exports.sessionRouter = router;
