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
var wildcard_adv = config.wildcard_adv;


// ws soap modules
var config = require('./config.js');
var ws = require('ws.js');
var Http = ws.Http;
var cards64;
var advs64;



function do_import_success(fileName){
	console.log('Импортирую данные...');
	// move file to tmp
	fs.renameSync(source_dir + fileName, tmp_dir + fileName);
	// open file for edit
	fs.createReadStream(tmp_dir + fileName,{
		encode: null
	})
	// and editing him
		// .pipe(replacestream('discount-percent','percentage-discount'))
		// .pipe(replacestream('<Client','<client'))
		.pipe(fs.createWriteStream(success_dir + fileName));
		// remove file in tmp
	fs.unlinkSync(tmp_dir + fileName);

		// base64encode
	var file = success_dir + fileName;
	setTimeout(function(){
		var advs = fs.readFileSync(file);
		var advs64 = advs.toString('base64');
		// console.log('тут должен быть base64' + cards64);	
		ws_soap(advs64);
	}, 5000);


};



// function do_return(){
// 	console.log('нету ничего. ожидаю...');
// };

function parse(){
	glob(source_dir + wildcard_adv + "*.xml", function(err, files){
		for (var file in files){
			var fileName = path.basename(files[file]);
			do_import_success(fileName);
		} 
	});
};

function ws_soap (advs64) {
	// ws soap config 
// request for import cards
	var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.importing.plugins.cards.ERPIntegration.crystals.ru/">' + 
	   '<soapenv:Header/>' + 
	   '<soapenv:Body>' +
	      '<web:getCardsCatalog>' +
	         '<cardsCatalogXML>' + cards64 + '</cardsCatalogXML>' +
	      '</web:getCardsCatalog>' +
	   '</soapenv:Body>' +
	'</soapenv:Envelope>';

	var request_adv = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.discounts.ERPIntegration.crystals.ru/">' + 
						'<soapenv:Header/>' +
						'<soapenv:Body>'	+
							'<ws:importActions>' +
								'<xmlData>' + advs64 + '</xmlData>' +
							'</ws:importActions>' +
						'</soapenv:Body>' +
						'</soapenv:Envelope>';

	var ctx = {
		request: request_adv,
		url: config.url_soap_adv,
		action: 'importActions',
		contentType: 'text/xml'
	};


	var handlers = [new Http()];


	// собсно сам импорт по веб сервису
	ws.send(handlers, ctx, function(ctx){
		// ctx.response === 'true' ? console.log('Карты успешно добавлены!') : console.log('Ошибка импорта!!!');
		console.log(ctx.response);
	});
};


setInterval(parse, timeout);


// var soap = require("soap");
// var url = config.url_soap;
// var cards = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8Y2FyZHMtY2F0YWxvZz4NCgk8aW50ZXJuYWwtY2FyZCBudW1iZXI9IjE3MTA4NiIgYW1vdW50PSIwLjAiIGV4cGlyYXRpb24tZGF0ZT0iMjA1MC0xMi0wMyINCnN0YXR1cz0iQUNUSVZFIiBkZWxldGVkPSJmYWxzZSIgcGVyY2VudGFnZS1kaXNjb3VudD0iMTcuMTAiLz4NCjwvY2FyZHMtY2F0YWxvZz4="
// soap.createClient(url, function(err, client){
// 	client.getCardsCatalog(cards, function(err, result){
// 		console.log(result);
// 	})
// });


// fs.createReadStream(tmp_dir + fileName,{
// 	encode: null
// })
// 	.pipe(replacestream('discount-percent','percentage-discount'))
// 	.pipe(replacestream('<Client','<client'))
// 	.pipe(replacestream('55555','ooooo'))
// 	.pipe(process.stdout);


