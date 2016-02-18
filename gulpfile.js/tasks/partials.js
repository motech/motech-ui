var config = require('../config');
var gulp = require('gulp');
var path = require('path');

gulp.task('partials', function () {
    gulp.src([
            path.join(config.root.src,'**/*.html'),
            '!' + path.join(config.root.src,'partials/*.html'),
            '!' + path.join(config.root.src,'./*.html')
        ])
        .pipe(gulp.dest(config.root.dest));
});