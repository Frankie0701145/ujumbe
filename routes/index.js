const express = require('express');
const router = express.Router();
const signup = require("../controllers/signupController");
const forgotPassword = require("../controllers/forgotPasswordController");
const passport = require("passport");
const resetPassword = require("../controllers/resetPasswordController");
const changePassword = require("../controllers/changePasswordController");
const activateAccount = require("../controllers/activateAccountController");
const activationCheck = require("../controllers/middlewares/activationCheck");
const isAuthenticatedCheck = require("../controllers/middlewares/isAuthenticatedCheck");
const resendActivationEmail = require("../controllers/resendActivationEmailController");
const locationNews  = require("../controllers/locationNewsController");
const generateNews = require("../controllers/generateNewsController");
/* GET home page. */
router.get('/',isAuthenticatedCheck, activationCheck ,function(req, res, next) {
  user = req.user;
  locationsDetails = [
    {locationName: req.user.homeAddress,  lon: req.user.homeCoordinate.coordinate[0], lat: req.user.homeCoordinate.coordinate[1] },
    {locationName: req.user.workAddress, lon: req.user.workCoordinate.coordinate[0], lat: req.user.workCoordinate.coordinate[1]}
  ];
  // locationsDetails = [req.user.homeAddress, req.user.homeAddress];
  res.render('index', { title: "Ujumbe", errors: req.flash("err"), successMessages: req.flash("success"), req: req, locationsDetails: locationsDetails});
});

router.get("/locationNews", isAuthenticatedCheck, activationCheck, locationNews);

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
// Get sign up page
router.get('/signup', function(req, res, next){
    res.render('signup', {title: "Ujumbe", req: req, errors: null});
});
// Post signup
router.post('/signup', signup);

//activation page
router.get("/activate", isAuthenticatedCheck, function(req, res, next){
  console.log(req.user.email);
  res.render("activationAccount", {title: "Ujumbe", req:req, errors: req.flash("err"), successMessages: req.flash("success"), errActivation: req.flash("errActivation")});
});
//activation end point
router.get("/activateAccount/:accesstoken", activateAccount);
//activation resend email endpoint
router.get("/resendActivationEmail", resendActivationEmail);
//forgot password page
router.get("/forgotPassword", function(req, res, next){
    res.render('forgotPassword', {title: "Ujumbe", req: req, errors: req.flash("err"), successMessages: req.flash("success")});
});
//forgot password post page
router.post("/forgotPassword", forgotPassword);

//reset password callback url
router.get("/resetPassword/:accesstoken", resetPassword);

//change password end point
router.post("/resetPassword", changePassword );

//route to generate news
router.get("/generateNews", generateNews);


module.exports = router;
