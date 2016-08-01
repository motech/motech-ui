var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');
 
gulp.task('log', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-jenkins-reporter'));
});
