var config = require('../config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
var lib = require('bower-files')();
var concat = require('gulp-concat');
var bless = require('gulp-bless');
var postcss = require('gulp-postcss');
var path = require('path');

gulp.task('sass', function () {
    var includePaths = [
        config.root.src,
        'bower_components/font-awesome/scss',
        'bower_components/textAngular/src',
        'bower_components/bootstrap-sass/assets/stylesheets'
    ];
    includePaths = includePaths.concat(bourbon.includePaths);

    gulp
    .src([
        '/motech.scss',
        "/**/*.mixins.scss",
        "/**/*.scss",
        "/**/*.css"
        ], {
            root: config.root.src
        })
        .pipe(concat({
            path:'motech.scss'
        }))
        .pipe(sass({
            includePaths: includePaths
        }))
        .pipe(postcss([ require('postcss-flexibility') ]))
        .pipe(concat('motech.css'))
        .pipe(bless())
        .pipe(gulp.dest(
            path.join(config.app.dest, 'css')
            ));
});