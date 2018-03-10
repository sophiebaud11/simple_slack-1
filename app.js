var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var colors = require('colors/safe');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


// const { RTMClient } = require('@slack/client');
//
// // An access token (from your Slack app or custom integration - usually xoxb)
// const token = process.env.SLACK_BOT_TOKEN;
//
// // The client is initialized and then started to get an active connection to the platform
// const rtm = new RTMClient(token);
// rtm.start();
//
// // This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
// // See the "Combining with the WebClient" topic below for an example of how to get this ID
// const conversationId = process.env.SLACK_TEST_CHANNEL;
//
// // The RTM client can send simple string messages
// rtm.sendMessage('Hello there', conversationId)
//   .then((res) => {
//     // `res` contains information about the posted message
//     console.log('Message sent: ', res.ts);
//   })
//   .catch(console.error);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

console.log(colors.rainbow('\n\n+++++++++++++++++++++++++++++++++\nsimple_slack app starting up\n\n'));


module.exports = app;
