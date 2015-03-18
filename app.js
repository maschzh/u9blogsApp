var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var mongooseSession = require('mongoose-session');

var db = require('./config/db');
mongoose.connect(db.url);
//var routes = require('./routes/index');
//var users = require('./routes/users');
var webRouter = require('./web_router');
var apiRouter = require('./api_router_v1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'myCookieSecret'));
app.use(session({
      store: mongooseSession(mongoose),
      secret: process.env.COOKIE_SECRET || 'myCookieSecret',
      key: 'session',
      cookie: {maxAge : 90000}
}));

app.use(function (req, res, next){
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      res.header('Access-Control-Allow-Heads', 'Content-Type');
      next();
});

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRouter);
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
 //   var err = new Error('Not Found');
 //   err.status = 404;
  //  next(err);
//});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  //  app.use(function(err, req, res, next) {
   //     res.status(err.status || 500);
   //     res.render('error', {
    //        message: err.message,
    //        error: err
   //     });
  //  });
}

// production error handler
// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
  //  res.render('error', {
   //     message: err.message,
  //      error: {}
 //   });
//});

var debug = require('debug')('u9blogApp:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function(){
  console.log("Listen the port "+ port);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  debug('Listening on port ' + server.address().port);
}


module.exports = app;
