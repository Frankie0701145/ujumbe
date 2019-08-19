//imports
const express = require('express');
const router = express.Router();

//handlers
const commentingHandler = require("../controllers/commentController/commentingHandler");
//middlewares
const isAuthenticatedCheck = require("../controllers/middlewares/isAuthenticatedCheck");
const activationCheck = require("../controllers/middlewares/activationCheck");

router.post("/comment/:newsId",isAuthenticatedCheck,activationCheck, commentingHandler);

module.exports.commentRouter = router;
