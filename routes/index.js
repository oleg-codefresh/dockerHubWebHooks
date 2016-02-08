var express = require('express');
var router = express.Router();
var shortId = require('shortId');
var util    = require('util');
var SM      = require('../tools/sessions');
var debug   = require('debug')('index');
logs = {};
/* GET home page. */
router.get('/index1', function(req, res, next) {
  return res.render('index', { title: 'Deployer of DockerHub images' });
});

router.get('/log', function(req, res ,next){
  console.log('get log');

var data1 =  {"push_data": {
    "pushed_at": 1449017033,
    "images": [],
    "tag": "tag1",
    "pusher": "biscarch"
  }
 }
 var data2 =  {"push_data": {
     "pushed_at": 1449017033,
     "images": [],
     "tag": "tag2",
     "pusher": "oleg"
   }
  }
 SM.createSession();
 debug(console.log(SM.getAll()));
 res.send(SM.getAll());
 return ;
 //res.render('logs', { title: 'Hey', message: 'Hello there!'});

  // res.send(SM.toString());
});

/* GET home page. */

router.post('/exit', function(req, res, next) {
  process.exit(1);
  res.send('ok');
});

router.post('/dockerhub', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  var runScript = require('./runScript');
  var logs = [];
  var sessionId = SM.createSession();

  debug('request' + util.format(req.body));
  SM.addContext(sessionId, req.body.push_data);
  //runing default script
  var promise = runScript();
  promise.then(function(){

    console.log(util.format('[sessionId %s] completed', sessionId));
  }, function(err){
     console.log('failed with error');

  }, function(data){

    console.log(util.format('[sessionId %s] in progress', sessionId));
  }).finally(function(){
    console.log('session ended');
    SM.endSession(sessionId);
  });
  res.send('hook was handled');
})
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
