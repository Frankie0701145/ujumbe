//imports
const express = require('express');
const router = express.Router();
const passport = require("passport");

//controllers
const addLocationNewsHandler = require("../controllers/newsController/addLocationNewsHandler");
const homeNewsHandler = require("../controllers/newsController/homeNewsHandler");
const moreNewsHandler = require("../controllers/newsController/moreNewsHandler");
const locationNewsHandler =  require("../controllers/newsController/locationNewsHandler")
const agreeWithNewsHandler = require("../controllers/newsController/agreeWithNewsHandler")
const disagreeWithNewsHandler = require("../controllers/newsController/disagreeWithNewsHandler");
const newsShowHandler = require("../controllers/newsController/newsShowHandler");
const neutralWithNewsHandler = require("../controllers/newsController/neutralWithNewsHandler")
//middlewares
const isAuthenticatedCheck = require("../controllers/middlewares/isAuthenticatedCheck");
const activationCheck = require("../controllers/middlewares/activationCheck");

//endPoint to show news from the home of the user or the first location added
router.get('/homeNews', isAuthenticatedCheck, activationCheck, homeNewsHandler);

//endPoint to show news from a specific location
router.get('/locationNews/:locationId', isAuthenticatedCheck, activationCheck, locationNewsHandler);
//endpoint to load more news
router.get('/moreNews/:locationId', isAuthenticatedCheck, activationCheck, moreNewsHandler);

//endPoint to display the addNews page
router.get("/addNews", isAuthenticatedCheck, activationCheck, (req, res, next)=>{
    res.render('addNews',{
      errors: req.flash("err"),
      successMessages: req.flash("success"),
      req: req,
      locations:req.user.locations,
      validationErrors: null
    });
});

//endPoint to post new news
router.post("/addNews", isAuthenticatedCheck, activationCheck, addLocationNewsHandler);
router.get("/showLocationNews/:newsId",isAuthenticatedCheck, activationCheck, newsShowHandler);
//agree endPoint
router.get("/news/agree/:newsId",isAuthenticatedCheck,activationCheck,agreeWithNewsHandler);
//disagree endPoint
router.get("/news/disagree/:newsId",isAuthenticatedCheck,activationCheck,disagreeWithNewsHandler);
//neutral
router.get("/news/neutral/:newsId",isAuthenticatedCheck,activationCheck,neutralWithNewsHandler);
module.exports.locationNewsRouter = router;
