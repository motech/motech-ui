var config = require('../config');
var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var path = require('path');
var gulpSequence = require('gulp-sequence');
var s3 = require( "gulp-s3" );

var styleguideSource = path.join(config.app.src, 'sass/**/*.scss');
var styleguideAssets = path.join(config.app.dest, 'css/*.css');

gulp.task('styleguide:generate', function() {

  return gulp.src(styleguideSource)
    .pipe(styleguide.generate({
        title: 'MOTECH Styleguide',
        overviewPath: path.join('OVERVIEW.md')
      }))
    .pipe(gulp.dest(config.styleguide.dest));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(styleguideAssets)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(config.styleguide.dest));
});

gulp.task('styleguide:deploy', function() {
  config.styleguidePath = "";
  gulpSequence('styleguide:generate', 'styleguide:applystyles')(function(){
    gulp.src(path.join(config.styleguide.dest, '**/*'))
      .pipe(s3(config.s3))
  });
})

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);