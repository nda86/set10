var chokidar = require('chokidar');
var fsex = require('fs-extra');
var path_util = require('path');
var config = require('./config.js');

var smarket_xml = config.smarket_xml;
var source_dir = config.source_dir;
smarket_xml = 'E:\\Kassa200';
var watcher = chokidar.watch(smarket_xml);
console.log('Start watcher...');
watcher
	.on('add', function(path){
		var fileName = path_util.basename(path);
		fsex.copySync(path, source_dir + fileName);
		console.log((new Date()).toLocaleDateString() + "/" + (new Date()).toLocaleTimeString() + ': file ' + fileName + ' success copy');

	})
	.on('change', function(path){
		console.log('File is changed!');
		var fileName = path_util.basename(path);
		console.log((new Date()).toLocaleDateString() + "/" + (new Date()).toLocaleTimeString() + ': file ' + fileName + ' success copy');
	});