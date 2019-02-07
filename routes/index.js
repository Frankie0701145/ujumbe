const express = require('express');
const router = express.Router();
const signup = require("../controllers/signupController");
const forgotPassword = require("../controllers/forgotPasswordController");
const passport = require("passport");
const resetPassword = require("../controllers/resetPasswordController");
const changePassword = require("../controllers/changePasswordController");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UjamaaWatch', errors: req.flash("err"), successMessages: req.flash("success"), req: req});
});

/* Get login page */
router.get('/login', function(req, res, next){
  // console.log(req.flash("err"));
  res.render('login', { title: 'UjamaaWatch', req: req, errors: req.flash("err"), successMessages: req.flash("success")});

});

// Post login
router.post('/login',passport.authenticate('local',{successRedirect: "/",failureRedirect: "/login", failureFlash: true}));

//logout endpoint
router.get("/logout", function(req, res, next){
   req.logout();
   res.redirect('/');
});
// Get sign up page
router.get('/signup', function(req, res, next){
    res.render('signup', {title: 'UjamaaWatch', req: req, errors: null});
});
// Post signup
router.post( '/signup', signup);
//forgot password page
router.get("/forgotPassword", function(req, res, next){
    res.render('forgotPassword', {title: 'UjamaaWatch', req: req, errors: req.flash("err"), successMessages: req.flash("success")});
});
//forgot password post page
router.post("/forgotPassword", forgotPassword);

//reset password callback url
router.get("/resetPassword/:accesstoken", resetPassword);

//change password end point
router.post("/resetPassword", changePassword );



module.exports = router;
