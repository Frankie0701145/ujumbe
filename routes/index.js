const homeRouter = require('./homeRouter').indexRouter;
const newsRouter = require('./newsRouter').locationNewsRouter;
const sessionRouter = require('./sessionRouter').sessionRouter;
const userRouter = require('./userRouter').userRouter;
const commentRouter = require('./commentRouter').commentRouter;

module.exports = [homeRouter, newsRouter, sessionRouter, userRouter, commentRouter];
