var SM = require('./sessions');
var assert = require('assert');

describe('sessions tests', function(){
  var currentSession;//jshint:lineignore
  beforeEach(function(done){
    done();
  });
  it('create session', function(done){
    var sessionId =  SM.createSession();
    done();
  });

  it('add context to sesion', function(done){

    var sessionId =  SM.createSession();
    var ctx =  {pushId : 12345, pushed_at : new Date()};
    var id = SM.addContext(sessionId, ctx);
    console.log(SM.toString());
    SM.endSession(sessionId);
    console.log(SM.toString());
    done();

    assert.equal(sessionId, id);

  });

  it('get context to session', function(done){

    var sessionId =  SM.createSession();
    var ctx =  {pushId : 12345, pushed_at : new Date()};
    var id = SM.addContext(sessionId, ctx);
    console.log(SM.toString());
    var ret = SM.getContext(sessionId);
    assert.equal(ctx, ret);

    done();

    assert.equal(sessionId, id);

  });
});
