var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UjamaaWatch' });
});

/* Get login page */
router.get('/login', function(req, res, next){
  res.render('login', { title: "UjamaaWatch", req: req });
});
// Post login
router.post('/login',function(req, res, next){
      res.send("trying to loging");
});
// Get sign up page
router.get('/signup', function(req, res, next){
    res.render("signup", {title: "UjamaaWatch", req: req});
});
// Post signup
router.post('/signup', function(req, res, next){
      console.log(req.head);
      console.log(req.body);
});

module.exports = router;
