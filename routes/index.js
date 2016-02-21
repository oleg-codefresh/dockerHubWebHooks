'use strict';

var express = require('express');
var router = express.Router();
var util    = require('util');
var SM      = require('../tools/sessions');
var debug   = require('debug')('index');
var runScript = require('./runScript');
var assert = require('assert');

/* GET home page. */
router.get('/index1', function(req, res, next) {
  return res.render('index', { title: 'Deployer of DockerHub images' });
});

router.get('/log', function(req, res ,next){
  console.log('get log');

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

router.get('/dockerfile/:type?', function(req, res, next) {

     var config = require('../config');

     var type = req.params.type || '';
     console.log('type is:'  + type);

     var file = config['dockerfile' + type];

     var path = require('path');
     var fs   = require('fs');

     var file = path.resolve('./', file );

     fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
          res.send(200, data);
      });

});


router.get('/run/:task', function(req, res){

  var task = req.params.task + '.sh';
  var promise = runScript(task);
  var sessionId = SM.createSession();

  promise.then(function(data){
    console.log('requirest completed with data:' + data);
    return res.send(200, data);
  }, function(err){
     console.log('err happend: ' + JSON.stringify(err));
     return res.send(400, err);
  }, function(progress){
     console.log('progress:' + JSON.stringify(progress));

  }).catch(function(){
     res.send(400);
  }).finally(function(){
      SM.addContext(sessionId, {pushed_at : new Date()});
      SM.endSession(sessionId);
  })

});
router.post('/dockerhub', function(req, res, next) {
  console.log(JSON.stringify(req.body));

  var logs = [];
  var sessionId = SM.createSession();

  debug('request' + util.format(req.body));
  req.body.push_data.pushed_at = new Date();
  SM.addContext(sessionId, req.body.push_data);
  //runing default script
  var promise = runScript('run-compose.sh');
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
