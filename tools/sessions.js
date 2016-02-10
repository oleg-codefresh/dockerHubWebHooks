var shortId = require('shortid');
var all = {};
var _       = require('lodash');
var debug   = require('debug')('SM');
var util    =  require('util');
var assert  = require('assert');

debugger;
var SM = function(){

};

var d =  {"push_data": {
    "pushed_at": 1449017033,
    "images": [],
    "tag": "tag1",
    "pusher": "biscarch"
  }
 }
var index = 0;
SM.prototype.createSession  = function(ctx)
{
  var id = shortId();
  index++;
  if (!ctx){

    var o = _.clone(d);
    o.pushed_at =  new Date();
    o.pusher = o.pusher  + index;
    ctx = o;
}

  //this.addContext(id, ctx);
  return id;
};

SM.prototype.getAll = function(){
  debug('getAll')
  var ret = [];
  _.mapKeys(all, function(value, key){
    debug('value:'  + JSON.stringify(value));
    return ret.push(value);
  });

  debug(JSON.stringify(ret));

  return ret;
};
SM.prototype.clearAll = function(){
  all = [];
}
SM.prototype.addContext = function(sessionId, ctx){
  if (!ctx)
  ctx = {}
  
  all[sessionId] = _.clone(ctx);
  all[sessionId].status = 'inprogress';
  debug(util.format('session added key %j  value %j', sessionId, ctx));
  return sessionId;
};
SM.prototype.getContext = function(sessionId)
{
  debug('get context for id ' + sessionId);
  return all[sessionId];
};

SM.prototype.endSession = function(sessionId){
  var session = all[sessionId];
  assert(session);
  session.status = 'done';

  return session;
};

SM.prototype.toString = function(){
  debug('SM.toString');
  var ret =  _.reduce(all,function(data, value, key){
       debug('key :' + JSON.stringify(key));
       debug('value :' + JSON.stringify(value));
       data.push({sessionId: key, status : value.status});
       return data;
  }, []);
  return JSON.stringify(JSON.stringify(ret));
};

module.exports  = new SM();
