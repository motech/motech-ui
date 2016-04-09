var config = require('../config');
var gulp = require('gulp');
var path = require('path');

gulp.task('images', function () {
    gulp.src([
    		'/**/*.gif',
    		'/**/*.jpg',
    		'/**/*.png',
    		'/**/*.svg'
    	],{
    		root: config.app.src,
    		base: 'src'
    	})
        .pipe(gulp.dest(config.app.dest));
});