var express = require('express');
var router = express.Router();
var colors = require('colors/safe');
require('dotenv').config();
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
var Shoot = require("../models/shoot.js");
var indexLinks = require("../data/urls/index_links.json")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simple Slack', message: 'a simple page', links: indexLinks });
});

router.post('/slack-interactions', function(req, res, next) {
  console.log("just got a post to interactions");
  console.log(JSON.stringify(req.body, null, 4));
  var theResponse = JSON.parse(req.body.payload);
  console.log(JSON.stringify(theResponse, null, 4));
  var thePayload = {
    text: "got your message",
    replace_original: false
  }
  res.json(thePayload);
});

router.post('/slack-slash', function(req, res, next) {
  console.log(JSON.stringify(req.body, null, 4))
  res.send('got your message');
});

router.post('/simple-slack-slash', function(req, res, next) {
  console.log(colors.rainbow('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■'));
  console.log(colors.rainbow('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■'));
  console.log(colors.rainbow('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■'));
  console.log("got a request");
  console.log(JSON.stringify(req.body, null, 4));
  if (req.body.user_name) {
    var theText = 'just received a message from user ' + req.body.user_name + ": \n" + req.body.text + ".\n\n We'll do more interesting stuff in a bit."
    var thePayload = {
      text: (theText),
      attachments:
        [{
          title: "just a simple gif",
          image_url: "https://media.giphy.com/media/5hHOBKJ8lw9OM/giphy.gif"
        },
        {
            "fallback": "Would you recommend it to customers?",
            "title": "Would you recommend it to customers?",
            "callback_id": "comic_1234_xyz",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "recommend",
                    "text": "Recommend",
                    "type": "button",
                    "value": "recommend"
                },
                {
                    "name": "no",
                    "text": "No",
                    "type": "button",
                    "value": "bad"
                }
            ]
        }]
      }
    console.log(JSON.stringify(thePayload, null, 4));
    // res.send(JSON.stringify(thePayload));
    res.json(thePayload);

  }
  else {
    res.send('just received a message, but cannot figure out who sent it')
  }
});

router.post('/reallysimple-slash', function(req, res, next) {
  console.log("got a request:");
  console.log(JSON.stringify(req.body, null, 4));
  res.send('just received a message. will do more soon')
})

router.post('/shootid-slash', function(req, res, next) {
  console.log("got a request:");
  console.log(JSON.stringify(req.body, null, 4));
  res.send('just received a message. will do more soon');
  Shoot.find({"shootId" : {$regex : (req.body.text), $options : "i"}}, (err, data)=>{
    var payload = {channel: req.body.channel_id, text: 'Event list:'};
    var shootIdArray = [];
    data.forEach(function(result){
      payload.text += ("\n"+result.shootId);
      shootIdArray.push(result.shootId);
    })
    web.chat.postMessage(payload)
    .then((res) => {
      // `res` contains information about the posted message
      console.log('Message sent: ', res.ts);
      console.log(JSON.stringify(shootIdArray));
    })
    .catch(console.error);
  });
})

router.post('/slack-events', function(req, res){
  res.send("got it");
  // res.send(req.body.challenge);
  // var newSlackEvent = new SlackEvent(req.body);
  // newSlackEvent.save(function(err){
  //   if (err) {console.log("there was an error");
  //   return next(err)}
  //   else {
  //     console.log("saved event to db");
  //   }
  // })
  console.log('just got an event \n' + JSON.stringify(req.body));
  console.log('going to respond in channel ' + req.body.event.channel);
  // web.chat.postMessage({channel: req.body.event.channel, text: ("hello from shootid-bot in response to " + req.body.event.text)}, function(err, data){
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     console.log('message sent');
  //   }
  // })
})

router.get('/slack-channels', function(req, res, next){
  web.channels.list()
    .then((data) => {
      console.log(JSON.stringify(data, null, 4));
      res.render('slack_channels', {title: "Slack Channel List", message: "here are your slack channels", data: data.channels})
    })
    .catch(console.error);
})

router.post('/slack-history-post', function(req, res, next){
  console.log(JSON.stringify(req.body, null, 4));
  res.redirect(('/slack-history/' + req.body.channel))
})

router.get('/slack-history/:channel', function(req, res, next){
  console.log(JSON.stringify(req.params, null, 4));
  // res.send(req.params);
  web.channels.history({channel: req.params.channel, count: 20}, function(err, data){
    console.log(JSON.stringify(data, null, 4));
    res.render('slack_history', {title: ("history for Slack Channel " + req.params.channel), message: "no message", data: data })
  })



})

module.exports = router;
