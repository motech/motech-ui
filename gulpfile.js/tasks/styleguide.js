var config = require('../config');
var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var path = require('path');

var paths = {
    src: path.join(config.assets.src, '**/*.css'),
    dest: path.join(config.assets.dest, 'css')
};

var outputPath = path.join(config.root.dest, config.styleguidePath);

gulp.task('styleguide:generate', function() {

  return gulp.src(path.join(config.assets.src, 'sass/**/*.scss'))
    .pipe(styleguide.generate({
        title: 'MOTECH Styleguide',
        appRoot: config.styleguidePath,
        overviewPath: path.join('README.md')
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(path.join(paths.dest, '*.css'))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);