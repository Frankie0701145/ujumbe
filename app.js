
//imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csurf = require('csurf');
const logger = require('morgan');
const flash = require("connect-flash");
const LocalStrategyPassport = require("./config/init/localStrategyPassport");
const passport = require('passport');
const moment =  require('moment');

//routes
const indexRouter = require('./routes/indexRoute').indexRouter;
const locationNewsRouter = require('./routes/locationNewsRoute').locationNewsRouter;
// const newsRouter = require('./routes/newsRoute');
const sessionRouter = require('./routes/sessionRoute').sessionRouter;
const userRouter = require('./routes/userRoute').userRouter;
//end
//insatiate the app
const app = express();

//define options used for the session cookie
const options = {
    secret: 'key cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
};
//insatiate the csurf middleware
const csrfMiddleware = csurf({cookie: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//hooking the middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
//end

//routers loading
app.use(indexRouter);
app.use(locationNewsRouter );
app.use(sessionRouter);
app.use(userRouter);
//end

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//my locals
app.locals.moment = moment;

module.exports = app;
