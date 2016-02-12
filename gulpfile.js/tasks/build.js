var config = require('../config');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build', function () {
	gulpSequence('build:app', 'build:styleguide')();
});

gulp.task('build:app', function () {
    gulpSequence('assets', 'fonts', 'images', 'index', 'partials', 'sass', 'js:hint', 'js:build', 'js:uglify')();
});

gulp.task('build:styleguide', function() {
	gulpSequence('styleguide:generate', 'styleguide:applystyles')();
});