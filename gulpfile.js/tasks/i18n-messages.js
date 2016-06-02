var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat');
var props = require('gulp-props');
var gulpSequence = require('gulp-sequence');
var jsoncombine = require("gulp-jsoncombine");
var Finder = require('fs-finder');
var jsesc = require('jsesc');

var languageTypes = [];

gulp.task('i18n', function(){
	return gulpSequence('i18n-messages')();
})

gulp.task('i18n-messages', function (callback) {
	languages = {}
	var allFiles = Finder.from(config.app.src).findFiles('*.properties');
	allFiles.forEach(function(filename){
		langReg = new RegExp('\..\.properties$', 'gi');
		matches = filename.match(langReg).forEach(function(match){
			lang = match.replace('.properties','');
			if(!languages[lang]){
				languages[lang] = [];
			}
			languages[lang].push(filename)
		});
	});
	langsNum = 0;
	function checkDone(){
		if(langsNum == Object.keys(languages).length){
			callback();
		}
	}
	Object.keys(languages).forEach(function(lang){
		var stream = gulp.src(languages[lang])
			.pipe(concat('motech-messages.'+lang+'.json'))
			.pipe(props({namespace:'', space: 2}))
			.pipe(gulp.dest(path.join(config.app.dest, 'i18n-messages')));
		stream.on('end', function(){
			langsNum++;
			checkDone();
		});
	});
});
