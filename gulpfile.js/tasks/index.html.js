var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var rename = require('gulp-rename');

function writeIndexPage() {
    return gulp.src(path.join(config.app.src, 'app', '_index.html'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(config.app.dest));
}

gulp.task('index.html', writeIndexPage);