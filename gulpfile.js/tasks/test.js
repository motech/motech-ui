var gulp = require('gulp');
var Server = require('karma').Server;

gulp.task('test', function(done) {
    console.log(__dirname);
    new Server({
        configFile: '../../../karma.conf.js',
        singleRun: true
    }, function() {
        done();
    }).start()
});


gulp.task('tdd', function (done) {
  new Server({
    configFile: '../../../karma.conf.js'
  }, done).start();
});
