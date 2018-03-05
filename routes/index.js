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

router.post('/slack-events', function(req, res, next) {
  console.log(JSON.stringify(req.body, null, 4))
  res.send(req.body.challenge);
});

router.get('/slack-history', function(req, res, next){
  var message = "Ultimately, we'll put our Slack App here.  The variable we're passing in here could contain anything."
  res.render('slack_history', {title: "Slack History", message: message})
  })


module.exports = router;
