
const spawn = require('child_process').spawn;
const dockerPull = function(done){
  var run = spawn('sh', ['./runImage.sh']);



run.stdout.on('data', (data) => {
  var buf = new Buffer(data);
  var str = buf.toString('utf-8');
  console.log(str);
});

run.stderr.on('data', (data) => {
  var buf = new Buffer(data);
  var str = buf.toString('utf-8');
  console.log('stderr: ${data}', str);
});

run.on('close', (code) => {
  if (code !== 0) {
    console.log('update has failed with ${code}', code);
    return done(code);
  }
  done();

});

};

module.exports = dockerPull;
