var express = require('express');
var router = express.Router();
var webhooks = [];
var shortId = require('shortId');
var util    = require('util');
var SM      = require('../tools/sessions');

logs = {};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Deployer of DockerHub images' });

});

router.get('/log', function(req, res ,next){
   res.send(SM.toString());
});

/* GET home page. */

router.post('/exit', function(req, res, next) {
  process.exit(1);
  res.send('ok');
});

router.post('/dockerhub', function(req, res, next) {
  //console.log(JSON.stringify(req));
  var runScript = require('./runScript');
  var logs = [];
  var session = SM.createSession();
  SM.addContext(session, {pushed_at: new Date()});
  //runing default script
  var promise = runScript();
  promise.done(function(){
    SM.endSession(session);
    console.log(util.format('[sessionId %s] completed', session));
  }, function(){}, function(data){

    console.log(util.format('[sessionId %s] in progress', session));
  });
  res.send('hook was handled');
});
router.post('/test', function(req, res, next) {
  //console.log(JSON.stringify(req));
  var runScript = require('./runScript');
  var logs = [];
  var session = SM.createSession();
  SM.addContext(session, {pushed_at: new Date()});

  var promise = runScript('./scripts/dummy.sh');
  promise.done(function(){
    SM.endSession(session);
    console.log(util.format('[sessionId %s] completed', session));
  }, function(){}, function(data){

    console.log(util.format('[sessionId %s] in progress', session));
  });
  res.send('hook was handled');
});


module.exports = router;
