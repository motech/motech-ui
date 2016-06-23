var config = require('../config');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build', function (cb) {
    gulpSequence('build:app', 'build:docs')(cb);
});

gulp.task('build:app', function (cb) {
    gulpSequence('assets', 'fonts', 'images', 'partials', 'index.html', 'motech.css', 'motech.js:hint', 'motech.js:build')(cb);
});

gulp.task('build:docs', function(cb){
	gulpSequence('docs')(cb);
});
