var config = require('../config');
var gulp = require('gulp');
var path = require('path');

gulp.task('fonts', function () {
    gulp.src([
        './bower_components/bootstrap/fonts/*',
        './bower_components/font-awesome/fonts/*'
    ]).pipe(gulp.dest(path.join(config.app.dest, 'fonts')));
})