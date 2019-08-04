const homeRouter = require('./homeRoute').indexRouter;
const newsRouter = require('./newsRoute').locationNewsRouter;
// const newsRouter = require('./routes/newsRoute');
const sessionRouter = require('./sessionRoute').sessionRouter;
const userRouter = require('./userRoute').userRouter;


module.exports = [homeRouter, newsRouter, sessionRouter, userRouter];
