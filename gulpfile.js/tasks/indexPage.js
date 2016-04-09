var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var nunjucks = require('gulp-nunjucks');

function writeIndexPage() {
    return gulp.src(path.join(config.app.src, 'index.html'))
        .pipe(nunjucks.compile({
            motechServerURL: config.motechServerURL,
            staticPath: config.staticPath
        }))
        .pipe(gulp.dest(config.app.dest));
}

gulp.task('index', writeIndexPage);