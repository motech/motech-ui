var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var nunjucks = require('gulp-nunjucks');

var paths = {
    src: config.app.src,
    dest: config.app.dest
}

function writeIndexPage() {
    return gulp.src(path.join(paths.src, 'index.html'))
        .pipe(nunjucks.compile({
            motechServerURL: config.motechServerURL,
            staticPath: config.staticPath
        }))
        .pipe(gulp.dest(paths.dest));
}

gulp.task('index', writeIndexPage);