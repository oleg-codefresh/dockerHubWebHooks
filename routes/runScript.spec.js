var runScript = require('./runScript');

var debug = require('debug')('run script tests');

describe('test docker sripts', function(){

  it('run docker pull', function(done){
    this.timeout(20000);
    var promise = runScript(done);
    promise.then(function(data){
         done();
    }, function(err){
      done(err);
    }, function(data){
      console.log('progress');
      console.log(JSON.stringify(data));
    });
  });

  it('run custom script', function(done){
    this.timeout(20000);
    var path = require('path');
    var dummyScript = path.resolve(__dirname, '../scripts/dummy.sh');
    debug(dummyScript);
    var promise = runScript(dummyScript);

    promise.then(function(data){
         done();
    }, function(err){
      done(err);
    }, function(data){
      console.log('progress');
      console.log(JSON.stringify(data));
    });
  });

  it.only('test pull', function(done){

    this.timeout(20000);
    var path = require('path');
    var scriptToRun = path.resolve(__dirname, '../scripts/pull.sh');
    debug(scriptToRun);

    process.env.image = 'buildup/backend';
    process.env.tag  = 'test_oleg';

    var promise = runScript(scriptToRun, process.env);

    promise.then(function(data){

         console.log('completed with data: '  + data);
         done();
         return data;

    }, function(err){

        console.log('err:' + err);
        return done(err);

    }, function(data){

      console.log('progress');
      console.log(JSON.stringify(data));

    });
  });
});
