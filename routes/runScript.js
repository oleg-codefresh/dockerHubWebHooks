


const spawn = require('child_process').spawn;
const path = require('path');
var Q = require ('q');
var debug = require('debug')('run script');

const dockerPull = function(script){
  debug('running script ' + script);

  var defer = Q.defer();
  if (!script)
  script = './runImage.sh';



  var cwd = path.resolve(__dirname, '../');
  console.log('current dir is ' + cwd);
  var run = spawn('sh', [script] ,{"cwd": cwd});



run.stdout.on('data', (data) => {
  var buf = new Buffer(data);
  var str = buf.toString('utf-8');
  defer.notify({src:'stdout', event:'newData'});
  console.log(str);
});

run.stderr.on('data', (data) => {
  var buf = new Buffer(data);
  var str = buf.toString('utf-8');
  console.log('stderr:' + str);
  defer.notify({src:'stderr', event:'newData'});
});

 run.on('close', (code) => {
  if (code !== 0) {
    console.log('update has failed with ${code}', code);

    return defer.reject(code);
  }

   return defer.resolve();

});

return defer.promise;

};

module.exports = dockerPull;
