var config = require('../config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
var lib = require('bower-files')();
var concat = require('gulp-concat');
var bless = require('gulp-bless');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var addsrc = require('gulp-add-src');

gulp.task('motech.css', function () {
    var includePaths = [
        config.root.src,
        'bower_components/font-awesome/scss',
        'bower_components/textAngular/src',
        'bower_components/bootstrap-sass/assets/stylesheets'
    ];
    includePaths = includePaths.concat(bourbon.includePaths);
    var bowerFiles = lib.ext('css').files;
    gulp
    .src([
        "/**/*.variables.scss",
        "/**/*.mixins.scss",
        "/**/*.scss",
        "/**/*.css"
        ], {
            root: config.root.src
        })
        .pipe(sourcemaps.init())
        .pipe(concat({
            path:'motech.scss'
        }))
        .pipe(sass({
            includePaths: includePaths
        }))
        .pipe(addsrc(bowerFiles))
        .pipe(sourcemaps.write())
        .pipe(concat('motech.css'))
        .pipe(bless())
        .pipe(gulp.dest(
            path.join(config.app.dest)
            ));
});