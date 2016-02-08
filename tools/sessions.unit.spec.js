var SM     = require('./sessions');
var assert = require('assert');
var _      = require('lodash');

describe('sessions tests', function(){
  var currentSession;//jshint:lineignore
  beforeEach(function(done){
    SM.clearAll();
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
    console.log('sessionId :' + sessionId);

    var ctx =  {pushId : 12345, pushed_at : new Date()};
    var id = SM.addContext(sessionId, ctx);
    console.log(SM.toString());
    var ret = SM.getContext(sessionId);
    var ctx1 = _.clone(ctx);
    ctx1.status = 'inprogress';
    assert.deepEqual(ctx1, ret);

    done();


  });

  it('get all session', function(done){

    var sessionId =  SM.createSession();
    var ctx =  {pushId : 12345, pushed_at : new Date()};
    var id = SM.addContext(sessionId, ctx);
    ctx.status = 'inprogress';
    console.log(SM.toString());
    var array =  SM.getAll();
    assert.deepEqual(ctx, array[0]);

    done();

  });



    it('get all session', function(done){

      var sessionId =  SM.createSession();
      var ctx =  {pushId : 12345, pushed_at : new Date()};
      var id = SM.addContext(sessionId, ctx);
      SM.endSession(sessionId);
      ctx.status = 'done';
      console.log(SM.toString());
      var array =  SM.getAll();
      assert.deepEqual(ctx, array[0]);

      done();

  });
});
