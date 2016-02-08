var config = require('../config');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build', function () {
    gulpSequence('assets', 'js', 'uglify', 'sass', 'fonts', 'images')();
});