var config = require('../config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var lib = require('bower-files')();
var concat = require('gulp-concat');
var bless = require('gulp-bless');
var path = require('path');

var paths = {
    src: path.join(config.assets.src, '**/*.css'),
    dest: path.join(config.assets.dest, 'css')
};

gulp.task('css', function () {
    var files = lib.ext('css').files;
    files.push(paths.src);
    gulp.src(files)
        .pipe(concat('motech.css'))
        .pipe(bless())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('sass', function () {
    gulp.src(path.join(config.assets.src,'sass/motech.scss'))
        .pipe(sass())
        .pipe(concat('motech.css'))
        .pipe(bless())
        .pipe(gulp.dest(paths.dest));
});