var config = require('../config');
var gulp = require('gulp');
var shell = require('gulp-shell');


gulp.task('docs', shell.task([
  'node_modules/jsdoc/jsdoc.js '+
    '-c node_modules/angular-jsdoc/common/conf.json '+   // config file
    '-t node_modules/angular-jsdoc/default '+   // template file
    '-d ' + config.docs.dest +                           // output directory
    ' ./OVERVIEW.md ' +                            // to include README.md as index contents
    '-r ' + config.app.src +               // source code directory
    ' -u ' + config.docs.src                              // tutorials directory
]));