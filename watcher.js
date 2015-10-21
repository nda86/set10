var chokidar = require('chokidar');
var fsex = require('fs-extra');
var path_util = require('path');
var config = require('./config.js');

var smarket_xml = config.smarket_xml;
var source_dir = config.source_dir;
var watcher = chokidar.watch(smarket_xml);
watcher
	.on('add', function(path){
		console.log('new file added!');
		var fileName = path_util.basename(path);
		console.log(path);
		// fsex.copySync(path, source_dir + fileName);
		// console.log('copy success');

	})
	// .on('change', function(path){
	// 	console.log('File is changed!');
	// 	var fileName = path_util.basename(path);
	// 	// if (fsex.copySync(path, source_dir + fileName)){
	// 	// 	console.log('copy success');
	// 	// }else{
	// 	// 	console.log('copy ERROR!!!');
	// 	// }
	// });