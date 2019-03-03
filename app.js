const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const movieCrawlerRouter = require('./routes/movieCrawler');
const numberRouter = require('./routes/number');
const blogRouter = require('./routes/blog');
const adminRouter = require('./routes/pages/admin');
const testRouter = require('./routes/test');

let cors = require('cors');
const app = express();

//db connections
const db = require('./helpers/db')();
const config = require('./config');
app.set('secret_key', config.secret_key);

//Middleware
const verifyToken = require('./middleware/verify-token');
const verifyPage = require('./middleware/verify-page');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/api', verifyToken);
app.use('/admin', verifyPage);
app.use('/admin', adminRouter);
app.use('/api/number', numberRouter);
app.use('/api/blog', blogRouter);
app.use('/api/category', categoryRouter);
app.use('/api/users', usersRouter);
app.use('/crawler/movie', movieCrawlerRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
