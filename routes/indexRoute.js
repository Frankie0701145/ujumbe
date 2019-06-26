//imports
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
  res.render('index', { title: "Ujumbe", errors: req.flash("err"), successMessages: req.flash("success"), req: req});
});

module.exports.indexRouter = router;
