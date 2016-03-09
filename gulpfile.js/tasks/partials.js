var config = require('../config');
var gulp = require('gulp');
var path = require('path');

gulp.task('partials', function () {
    gulp.src([
            path.join(config.app.src,'**/*.html'),
            '!' + path.join(config.app.src,'partials/*.html'),
            '!' + path.join(config.app.src,'./*.html')
        ])
        .pipe(gulp.dest(config.app.dest));
});