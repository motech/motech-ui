var config = require('../config');
var gulp = require('gulp');
var argv = require('yargs').argv;
var lib = require('bower-files')();
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var gulpSequence = require('gulp-sequence');
var path = require('path');

var sourcePaths = [
        '**/*.module.js', // modules initialized here
        '**/*.config.js',
        '**/*.routes.js',
        '**/*.js'
    ];

var paths = {
    src: sourcePaths.map(function(item){
        return path.join(config.app.src, item);
    }),
    dest: path.join(config.app.dest)
};

gulp.task('motech.js', function () {
    gulpSequence('motech.js:hint', 'motech.js:build')();
});

// Static: Compress JS files into motech.js
gulp.task('motech.js:build', function () {
    var files = lib.ext('js').files; // libraries from bower
    files = files.concat(paths.src);
    files = files.concat(["!" + path.join(config.app.src, "**/*.spec.js")]);
    return gulp.src(files)
        .pipe(replace('@@MOTECH_SERVER_URL', config.motechServerURL))
        .pipe(sourcemaps.init())
          .pipe(concat('motech.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest))
});

gulp.task('motech.js:hint', function(){
    var stream = gulp.src(paths.src)
        .pipe(jshint({
            validthis: true
        }))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('motech.js:uglify', function (){
    return gulp.src(path.join(paths.dest, 'motech.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest));
});
