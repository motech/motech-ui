var config = require('../config');
var gulp = require('gulp');
var path = require('path');
    jshint = require('gulp-jshint'),
    jshintXMLReporter = require('gulp-jshint-xml-file-reporter');
gulp.task('log', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint({
            validthis: true
        }))
        .pipe(jshint.reporter(jshintXMLReporter))
        .on('end', jshintXMLReporter.writeFile({
            format: 'checkstyle',
            filePath: 'target/jshint.xml'
        }));
});