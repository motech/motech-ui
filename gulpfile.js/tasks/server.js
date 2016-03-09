var compress = require('compression')
var config   = require('../config')
var express  = require('express')
var gulp     = require('gulp')
var gutil    = require('gulp-util')
var logger   = require('morgan')
var open     = require('open')
var path     = require('path')

var settings = {
    root: config.root.dest,
    port: process.env.PORT || 5000,
    logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
    staticOptions: {
        extensions: ['html'],
        maxAge: '31556926'
    }
}

var startServer = function(root, port) {
    var url = 'http://localhost:' + settings.port

    if(!root) root = settings.root;
    if(!port) port = settings.port;

    express()
        .use(compress())
        .use(logger(settings.logLevel))
        .use('/', express.static(root, settings.staticOptions))
        .listen(port)

    gutil.log('production server started on ' + gutil.colors.green(url))
    open(url)
}

gulp.task('serve:app', function () {
    startServer(config.app.dest);
});
gulp.task('serve:styleguide', function () {
    startServer(config.styleguide.dest);
});