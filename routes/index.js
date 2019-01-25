const express = require('express');
const router = express.Router();
const signup = require("../controllers/userController").signup;
const passport = require("passport");


// //setting up the flash message to be visible to the template
// router.use(function(req,res,next){
//     res.locals.currentUser = req.user;
//     res.locals.errorFlash = req.flash("error");
//     res.locals.infosFlash = req.flash("info");
//     next();
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.flash("success"));
  res.render('index', { title: 'UjamaaWatch' });
});

/* Get login page */
router.get('/login', function(req, res, next){
  console.log(req.flash("err"));
  res.render('login', { title: 'UjamaaWatch', req: req, errors: null });

});

// Post login
router.post('/login',passport.authenticate('local',{successRedirect: "/",failureRedirect: "/login", failureFlash: true}));

// Get sign up page
router.get('/signup', function(req, res, next){
    res.render('signup', {title: 'UjamaaWatch', req: req, errors: null});
});
// Post signup
router.post( '/signup', signup);

module.exports = router;
