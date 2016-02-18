var config = require('../config');
var gulp = require('gulp');
var argv = require('yargs').argv;
var lib = require('bower-files')();
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var gulpSequence = require('gulp-sequence');
var path = require('path');

var sourcePaths = [
        '**/*.module.js', // modules initialized here
        '**/*.config.js',
        '**/*.routes.js',
        '**/*.js',
        '*.js' // app.js
    ];

var paths = {
    src: sourcePaths.map(function(item){
        return path.join(config.root.src, item);
    }),
    dest: path.join(config.assets.dest, 'js')
}

gulp.task('js', function () {
    gulpSequence('js:hint', 'js:build')();
});

// Static: Compress JS files into motech.js
gulp.task('js:build', function () {
    var files = lib.ext('js').files; // libraries from bower
    return gulp.src(files.concat(paths.src))
        .pipe(sourcemaps.init())
          .pipe(concat('motech.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest))
});

gulp.task('js:hint', function(){
    var stream = gulp.src(paths.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    if(argv.production){
        stream.pipe(jshint.reporter('fail'));
    }
});

gulp.task('js:uglify', function (){
    return gulp.src(path.join(paths.dest, 'motech.js'))
        .pipe(uglify())
        .pipe(rename('motech.min.js'))
        .pipe(gulp.dest(paths.dest));
});