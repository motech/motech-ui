var config = require('../config');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build', function () {
    gulpSequence('build:app')();
});

gulp.task('build:app', function () {
    gulpSequence('assets', 'fonts', 'images', 'partials', 'index.html', 'motech.css', 'i18n', 'motech.js:hint', 'motech.js:build')();
});

gulp.task('build:styleguide', function() {
    gulpSequence('styleguide:generate', 'styleguide:applystyles')();
});