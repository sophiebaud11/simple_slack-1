var express = require('express');
var router = express.Router();
var colors = require('colors/safe');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(colors.rainbow('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■'));
  console.log(colors.rainbow('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■'));
  console.log(colors.rainbow('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■'));
});

router.post('/slack-interactions', function(req, res, next) {
  console.log(JSON.stringify(req.body, null, 4))
  res.send('got your message');
});

router.post('/slack-slash', function(req, res, next) {
  console.log(JSON.stringify(req.body, null, 4))
  res.send('got your message');
});

router.post('/simple-slack-slash', function(req, res, next) {
  console.log("got a request");
  console.log(JSON.stringify(req.body, null, 4))
  res.send('just received a message from user ' + req.body.event.user + "We'll figure out who you are when we get a grasp of the rest of the API.");
});

router.post('/slack-events', function(req, res, next) {
  console.log(JSON.stringify(req.body, null, 4))
  res.send(req.body.challenge);
});

router.get('/slack-history', function(req, res, next){
  var sampleData = [
     {
         "city": "New York",
         "population": "8405837",
         "state": "New York"
     },
     {
         "city": "Los Angeles",
         "population": "3884307",
         "state": "California"
     },
     {
         "city": "Chicago",
         "population": "2718782",
         "state": "Illinois"
     }
  ];
  var message = "Ultimately, we'll put our Slack App here.  The variable we're passing in here could contain anything.";
  res.render('slack_history', {title: "Slack History", message: message, data: sampleData})
  })


module.exports = router;
