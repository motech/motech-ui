var config = require('../config');
var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var path = require('path');
var gulpSequence = require('gulp-sequence');
var s3 = require( "gulp-s3" );


gulp.task('styleguide:generate', function() {

  return gulp.src([
      '/**/*.scss',
      '/**/*.css'
    ],{
      root: config.app.src,
      base: 'src'
    })
    .pipe(styleguide.generate({
        title: 'MOTECH Styleguide',
        overviewPath: path.join('OVERVIEW.md')
      }))
    .pipe(gulp.dest(config.styleguide.dest));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src([
      path.join(config.app.dest, '*.css')
    ])
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