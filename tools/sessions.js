var shortId = require('shortid');
var all = {};
var _       = require('lodash');
var debug   = require('debug')('SM');
var util    =  require('util');
var assert  = require('assert');

debugger;
var SM = function(){

};

SM.prototype.createSession  = function()
{
  var id = shortId();
  this.addContext(id, {});
  return id;
};
SM.prototype.addContext = function(sessionId, ctx)
{
  all[sessionId] = {ctx:ctx, status : 'inprogress'};
  debug(util.format('session added key %j  value %j', sessionId, ctx));
  return sessionId;
};
SM.prototype.getContext = function(sessionId)
{
  debug('get context for id ' + sessionId);
  return all[sessionId].ctx;
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
