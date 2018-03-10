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

// new Slack RTM bot
const { RTMClient } = require('@slack/client');
// var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var rtm = new RTMClient(process.env.SLACK_TOKEN);
rtm.start();

// The RTM client can send simple string messages
rtm.sendMessage('Hello there', process.env.SLACK_TEST_CHANNEL)
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);


let channel;
// rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
//   for (const c of rtmStartData.channels) {
//       if (c.is_member && c.name ==='jamiestestchannel') { channel = c.id }
//   }
//   console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
// });


// var botkit = require('botkit');
// var botController = botkit.slackbot({
//   debug: false
// });
// botController.spawn({token: process.env.SLACK_TOKEN}).startRTM();
// botController.hears('hello',
//   ['direct_message','direct_mention','mention'],
//   function(bot,message) {
//     bot.reply(message,'Hello yourself.');
//   }
// );


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

console.log(colors.rainbow('\n\n+++++++++++++++++++++++++++++++++\nsimple_slack app starting up/n/n'));


module.exports = app;
