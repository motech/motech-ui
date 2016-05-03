var config = require('../config');
var gulp = require('gulp');
var path = require('path');

gulp.task('partials', function () {
    gulp.src([
            '/*/**/*.html',
            '!_*.html'
        ],{
        	root: config.app.src,
        	base: 'src'
        })
        .pipe(gulp.dest(config.app.dest));
});