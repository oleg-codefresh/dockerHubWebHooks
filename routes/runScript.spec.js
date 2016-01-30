var runScript = require('./runScript');
var Q = require('Q')
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

  it.only('run custom script', function(done){
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
});
