var gulp = require('gulp');
var Server = require('karma').Server;

gulp.task('test', function(done) {
	console.log(__dirname);
	new Server({
		configFile: '../../../karma.conf.js',
		singleRun: true
	}, done).start()
});