var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UjamaaWatch' });
});

/* Get login page */
router.get('/login', function(req, res, next){
  res.render('login', { title: "UjamaaWatch" });
});

router.post('/login',function(req, res, next){
      res.send("trying to login");
});

module.exports = router;
