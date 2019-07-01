const indexRouter = require('./indexRoute').indexRouter;
const locationNewsRouter = require('./locationNewsRoute').locationNewsRouter;
// const newsRouter = require('./routes/newsRoute');
const sessionRouter = require('./sessionRoute').sessionRouter;
const userRouter = require('./userRoute').userRouter;


module.exports = [indexRouter, locationNewsRouter, sessionRouter, userRouter];
