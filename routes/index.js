const express = require('express');
const router = express.Router();
const signup = require("../controllers/userController").signup;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UjamaaWatch' });
});

/* Get login page */
router.get('/login', function(req, res, next){
  res.render('login', { title: 'UjamaaWatch', req: req, errors: null });
});
// Post login
router.post('/login',function(req, res, next){
      res.send('trying to loging');
});
// Get sign up page
router.get('/signup', function(req, res, next){
    res.render('signup', {title: 'UjamaaWatch', req: req, errors: null});
});
// Post signup
router.post( '/signup', signup);

module.exports = router;
