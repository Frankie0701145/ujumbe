//imports
const express = require('express');
const router = express.Router();

//controllers
const signupHandler = require("../controllers/userController/signupHandler");
const activateAccountHandler = require("../controllers/userController/activateAccountHandler");
const resendActivationEmailHandler = require("../controllers/userController/resendActivationEmailHandler");
const forgotPasswordHandler = require("../controllers/userController/forgotPasswordHandler");
const resetPasswordHandler = require("../controllers/userController/resetPasswordHandler");
const changePasswordHandler = require("../controllers/userController/changePasswordHandler");

//middlewares
const isAuthenticatedCheck = require("../controllers/middlewares/isAuthenticatedCheck");

// Get Sign up page
//end point to get the signup page
router.get('/signup', function(req, res, next){
    res.render('signup', {title: "Ujumbe", req: req, errors: null});
});

// Post Signup
//end point to post the signup details
router.post('/signup', signupHandler);

//GET Activation page
//Get the activation page
router.get("/activate", isAuthenticatedCheck, function(req, res, next){
  console.log(req.user.email);
  res.render("activationAccount", {title: "Ujumbe", req:req, errors: req.flash("err"), successMessages: req.flash("success"), errActivation: req.flash("errActivation")});
});


//Activation End point
//end Point to activate the account
router.get("/activateAccount/:accesstoken", activateAccountHandler);

//activation resend email endpoint
//end point to resend the activation email
router.get("/resendActivationEmail", resendActivationEmailHandler);

//forgot password page
//endpoint to get post the email so as to change the password
router.get("/forgotPassword", function(req, res, next){
    res.render('forgotPassword', {title: "Ujumbe", req: req, errors: req.flash("err"), successMessages: req.flash("success")});
});

//forgot password post page
//endpoint to postthe email which is used to confirm the legitimacy of the user
router.post("/forgotPassword", forgotPasswordHandler);

//reset password callback url
//endpoint to display the page to change the password
router.get("/resetPassword/:accesstoken", resetPasswordHandler);

//change password end point
//end point to change the password
router.post("/resetPassword", changePasswordHandler);

module.exports.userRouter = router;
