const express = require('express');
const router = express.Router();
const signup = require("../controllers/signupController");
const forgotPassword = require("../controllers/forgotPasswordController");
const passport = require("passport");


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.flash("success"));
  res.render('index', { title: 'UjamaaWatch' });
});

/* Get login page */
router.get('/login', function(req, res, next){
  // console.log(req.flash("err"));
  res.render('login', { title: 'UjamaaWatch', req: req, errors: req.flash("err")});

});

// Post login
router.post('/login',passport.authenticate('local',{successRedirect: "/",failureRedirect: "/login", failureFlash: true}));

// Get sign up page
router.get('/signup', function(req, res, next){
    res.render('signup', {title: 'UjamaaWatch', req: req, errors: null});
});
// Post signup
router.post( '/signup', signup);
//forgot password page
router.get("/forgotPassword", function(req, res, next){
    res.render('forgotPassword', {title: 'UjamaaWatch', req: req, errors: req.flash("err")});
});
//forgot password post page
router.post("/forgotPassword", forgotPassword);
module.exports = router;
