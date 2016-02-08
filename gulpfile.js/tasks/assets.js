var config = require('../config');
var gulp = require('gulp');
var path = require('path');

gulp.task('assets', function () {
    gulp.src(path.join(config.app.src, 'assets/*'))
        .pipe(gulp.dest(config.app.dest));
});