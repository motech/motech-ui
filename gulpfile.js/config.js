var config = require('../config');
var s3 = require('../config.s3');
var argv = require('yargs').argv;

config.s3 = s3;
if(argv.awsKey){
    config.s3.key = argv.awsKey;
}
if(argv.awsSecret){
    config.s3.secret = argv.awsSecret;
}
if(argv.awsBucket){
    config.s3.bucket = argv.awsBucket;
}
if(argv.aweRegion){
    config.s3.require = argv.aweRegion;
}

if (argv.dest) {
    config.root.dest = argv.dest;
}

if (argv.motechServerURL){
	config.motechServerURL = argv.motechServerURL;
}

module.exports = config;