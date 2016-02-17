


const spawn = require('child_process').spawn;
const path = require('path');
var Q = require ('q');
var debug = require('debug')('run script');


const run = function(script, env){

  debug('running script ' + script);


  var defer = Q.defer();
  if (!script)
   script = './runImage.sh';


  var cwd = path.resolve(__dirname, '../scripts');
  console.log('current dir is ' + cwd);
  var run = spawn('sh', [script] ,{"cwd": cwd, env : env});
  var returnData='';


run.stdout.on('data', (data) => {
  var buf = new Buffer(data);
  var str = buf.toString('utf-8');
  returnData  += str;
  defer.notify({src:'stdout', event:'newData', data:returnData});
  console.log(str);
});

run.stderr.on('data', (data) => {
  var buf = new Buffer(data);
  var str = buf.toString('utf-8');
  console.log('stderr:' + str);
  defer.reject({src:'stderr', event:'newData', data:str});
});

 run.on('close', (code) => {
   console.log(code);
  if (code !== 0) {
    console.log('update has failed with ${code}', code);

    return defer.reject(code);
  }

   return defer.resolve(returnData);

});

return defer.promise;

};

module.exports = run;
