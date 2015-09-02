var config = require('./config.js');
var fs = require('fs');
var replacestream = require('replacestream');
var glob = require('glob');
var path = require('path');
var timeout = config.timeout;
var source_dir = config.source_dir;
var tmp_dir = config.tmp_dir;
var success_dir = config.success_dir;
var error_dir = config.error_dir;
var wildcard = config.wildcard;
// var oldPercent = config.oldPercent;
// var newPercent = config.newPercent;

function do_import(fileName){
	console.log('Импортирую данные...');
	fs.renameSync(source_dir + fileName, tmp_dir + fileName);
	fs.createReadStream(tmp_dir + fileName,{
		encode: null
	})
		.pipe(replacestream('discount-percent','percentage-discount'))
		.pipe(replacestream('<Client','<client'))
		.pipe(fs.createWriteStream(success_dir + fileName));
	fs.unlinkSync(tmp_dir + fileName);

	console.log('Успех!!!');

};

function do_return(){
	console.log('нету ничего. ожидаю...');
};

function parse(){
	glob(source_dir + wildcard + "*.xml", function(err, files){
		for (var file in files){
			var fileName = path.basename(files[file]);
			do_import(fileName);
		} 
	});
};


setInterval(parse, timeout);




// fs.createReadStream(tmp_dir + fileName,{
// 	encode: null
// })
// 	.pipe(replacestream('discount-percent','percentage-discount'))
// 	.pipe(replacestream('<Client','<client'))
// 	.pipe(replacestream('55555','ooooo'))
// 	.pipe(process.stdout);
