var chokidar = require('chokidar');
var fsex = require('fs-extra');
var path_util = require('path');
var config = require('./config.js');

var smarket_xml = config.smarket_xml;
var source_dir = config.source_dir;
var watcher = chokidar.watch(smarket_xml);
watcher
	.on('add', function(path){
		var fileName = path_util.basename(path);
		fsex.copySync(path, source_dir + fileName);
	})
	.on('change', function(path){
		var fileName = path_util.basename(path);
		fsex.copySync(path, source_dir + fileName);
	})
