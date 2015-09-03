/*===============================================
=            base config and modules            =
===============================================*/
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
	var wildcard_cards = config.wildcard_cards;
	var wildcard_advs = config.wildcard_advs;
/*-----  End of base config and modules  ------*/




/*============================================
=            web services setting            =
============================================*/
	var ws = require('ws.js');
	var Http = ws.Http;
	// var handlers = [new Http()];
	var cards64;
	var advs64;
/*-----  End of web services setting  ------*/




/*===============================================
=            edit and move xml cards            =
===============================================*/

function do_import_cards(fileName){
	console.log('Импортирую данные...');
	// move file to tmp
	fs.renameSync(source_dir + fileName, tmp_dir + fileName);
	// open file for edit
	fs.createReadStream(tmp_dir + fileName,{
		encode: null
	})
	// and editing him
		.pipe(replacestream('discount-percent','percentage-discount'))
		.pipe(replacestream('<Client','<client'))
		.pipe(fs.createWriteStream(success_dir + fileName));
		// remove file in tmp
	fs.unlinkSync(tmp_dir + fileName);

		// base64encode
	var file = success_dir + fileName;
	setTimeout(function(){
		var cards = fs.readFileSync(file);
		var cards64 = cards.toString('base64');
		// console.log('тут должен быть base64' + cards64);	
		ws_soap_cards(cards64);
	}, 5000);
};

/*-----  End of edit and move xml cards  ------*/





/*================================================
=            send request to WS SET10  for cards          =
================================================*/

function ws_soap_cards (cards64) {
	// ws soap config 
// request for import cards
	var request_cards = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.importing.plugins.cards.ERPIntegration.crystals.ru/">' + 
	   '<soapenv:Header/>' + 
	   '<soapenv:Body>' +
	      '<web:getCardsCatalog>' +
	         '<cardsCatalogXML>' + cards64 + '</cardsCatalogXML>' +
	      '</web:getCardsCatalog>' +
	   '</soapenv:Body>' +
	'</soapenv:Envelope>';

	var ctx = {
		request: request_cards,
		url: config.url_soap_cards,
		action: 'getCardsCatalog',
		contentType: 'text/xml'
	};

	var handlers = [new Http()];

	// собсно сам импорт по веб сервису
	ws.send(handlers, ctx, function(ctx){
		// ctx.response === 'true' ? console.log('Карты успешно добавлены!') : console.log('Ошибка импорта!!!');
		console.log(ctx.response);
	});
};

/*-----  End of send request to WS SET10  ------*/




/*=====================================================
=            edit and move XML advertising            =
=====================================================*/

function do_import_advs(fileName){
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
		ws_soap_advs(advs64);
	}, 5000);
};

/*-----  End of edit and move XML advertising  ------*/



/*================================================================
=            send request to WS SET10 for advertising            =
================================================================*/

function ws_soap_advs (advs64) {
	// ws soap config 
// request for import advertising
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
		url: config.url_soap_advs,
		action: 'importActions',
		contentType: 'text/xml'
	};


	// var Http = ws.Http;
	var handlers = [new Http()];


	// собсно сам импорт по веб сервису
	ws.send(handlers, ctx, function(ctx){
		// ctx.response === 'true' ? console.log('Карты успешно добавлены!') : console.log('Ошибка импорта!!!');
		console.log(ctx.response);
	});
};

/*-----  End of send request to WS SET10 for advertising  ------*/



/*===============================================
=            watching for source dir            =
===============================================*/

function parse(){
	glob(source_dir + wildcard_cards + "*.xml", function(err, files){
		for (var file in files){
			var fileName = path.basename(files[file]);
			do_import_cards(fileName);
		};
	});

	glob(source_dir + wildcard_advs + "*.xml", function(err, files){
		for (var file in files){
			var fileName = path.basename(files[file]);
			do_import_advs(fileName);
		};
	});
};
/*-----  End of watching for source dir  ------*/


setInterval(parse, timeout);



