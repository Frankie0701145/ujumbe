//imports
const express = require('express');
const router = express.Router();
const passport = require("passport");

//controllers
const locationNews  = require("../controllers/locationNewsController");
const generateNews = require("../controllers/generateNewsController");
const loadComments = require("../controllers/loadNewsController");
const generateComments = require("../controllers/generateCommentsController");
//end

//middlewares
const isAuthenticatedCheck = require("../controllers/middlewares/isAuthenticatedCheck");
const activationCheck = require("../controllers/middlewares/activationCheck");

//shows all the news
router.get('/allLocationNews',isAuthenticatedCheck, activationCheck ,function(req, res, next) {
  user = req.user;
  locationsDetails = [
    {locationName: req.user.homeAddress,  lon: req.user.homeCoordinate.coordinate[0], lat: req.user.homeCoordinate.coordinate[1] },
    {locationName: req.user.workAddress, lon: req.user.workCoordinate.coordinate[0], lat: req.user.workCoordinate.coordinate[1]}
  ];
  // locationsDetails = [req.user.homeAddress, req.user.homeAddress];
  res.render('allLocationNews', { title: "Ujumbe", errors: req.flash("err"), successMessages: req.flash("success"), req: req, locationsDetails: locationsDetails});
});

//shows news from specific location
router.get("/locationNews", isAuthenticatedCheck, activationCheck, locationNews);

//route to display the addLocation page
router.get("/addNews", isAuthenticatedCheck, activationCheck, (req, res, next)=>{
    res.render('addNews',{ title: "Ujumbe", errors: req.flash("err"), successMessages: req.flash("success"), req: req, locations:req.user.locations});
});



//route to generate news
router.get("/generateNews", generateNews);


//route to load comments based on the news
router.get("/loadComment/:id", loadComments);

//route to generate fake comments
router.get("/generateComments", generateComments);

module.exports.locationNewsRouter = router;
