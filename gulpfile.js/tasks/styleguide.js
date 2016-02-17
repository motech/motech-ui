var config = require('../config');
var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var path = require('path');
var gulpSequence = require('gulp-sequence');
var s3 = require( "gulp-s3" );

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

gulp.task('styleguide:deploy', function() {
  config.styleguidePath = "/";
  gulpSequence('styleguide:generate', 'styleguide:applystyles')(function(){
    gulp.src(path.join(config.root.dest, config.styleguidePath, '**/*'))
      .pipe(s3(config.s3))
  });
})

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);