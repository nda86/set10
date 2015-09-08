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
	var wildcard_goods = config.wildcard_goods;
	var set10_deployed = config.set10_deployed;
	// var wildcard_cashiers = config.wildcard_cashiers;
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



												/*-----  cards  ------*/

/*===============================================
=            edit and move xml cards            =
===============================================*/

function do_import_cards(fileName){
	// console.log('Импортирую данные...');
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
		// console.log(typeof ctx.response);
		// console.log(ctx.statusCode);

			console.log((new Date()).toLocaleString());
			console.log("Дисконтные карты: \n" + ctx.response);
			console.log("---------------------------------------------\n");

	});
};

/*-----  End of send request to WS SET10  for cards------*/




												/*-----  adverstising  ------*/

/*=====================================================
=            edit and move XML advertising            =
=====================================================*/

function do_import_advs(fileName){
	// console.log((new Date()).toLocaleString());
	// console.log('Импортирую данные рекламных акций...');
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
		console.log((new Date()).toLocaleString());
		console.log("Рекламные акции: \n" + ctx.response);
		console.log("---------------------------------------------\n");

	});
};

/*-----  End of send request to WS SET10 for advertising  ------*/




												/*-----  goods  ------*/

/*=====================================================
=            edit and move XML goods            =
=====================================================*/

function do_import_goods(fileName){
	// console.log((new Date()).toLocaleString());
	// console.log('Импортирую данные товаров...');
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
		var goods = fs.readFileSync(file);
		var goods64 = goods.toString('base64');
		// console.log('тут должен быть base64' + cards64);	
		ws_soap_goods(goods64);
	}, 5000);
};

/*-----  End of edit and move XML goods  ------*/



/*================================================================
=            send request to WS SET10 for goods            =
================================================================*/

function ws_soap_goods (goods64) {
	// ws soap config 
// request for import goods
var request_goods = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:plug="http://plugins.products.ERPIntegration.crystals.ru/">' +
   						'<soapenv:Header/>' +
   						'<soapenv:Body>' +
						    '<plug:getGoodsCatalog>' +
					    		'<goodsCatalogXML>' + goods64 + '</goodsCatalogXML>' +
						    '</plug:getGoodsCatalog>' +
						'</soapenv:Body>' +
					'</soapenv:Envelope>';

	var ctx = {
		request: request_goods,
		url: config.url_soap_goods,
		action: 'getGoodsCatalog',
		contentType: 'text/xml'
	};


	// var Http = ws.Http;
	var handlers = [new Http()];


	// собсно сам импорт по веб сервису
	ws.send(handlers, ctx, function(ctx){
		// ctx.response === 'true' ? console.log('Карты успешно добавлены!') : console.log('Ошибка импорта!!!');
		console.log((new Date()).toLocaleString());
		console.log("Рекламные акции: \n" + ctx.response);
		console.log("---------------------------------------------\n");
	});
};

/*-----  End of send request to WS SET10 for goods  ------*/




// 												/*-----  cashiers  ------*/

// /*=====================================================
// =            edit and move XML cashiers            =
// =====================================================*/

// function do_import_cashiers(fileName){
// 	console.log('Импортирую данные...');
// 	// move file to tmp
// 	fs.renameSync(source_dir + fileName, tmp_dir + fileName);
// 	// open file for edit
// 	fs.createReadStream(tmp_dir + fileName,{
// 		encode: null
// 	})
// 	// and editing him
// 		// .pipe(replacestream('discount-percent','percentage-discount'))
// 		// .pipe(replacestream('<Client','<client'))
// 		.pipe(fs.createWriteStream(success_dir + fileName));
// 		// remove file in tmp
// 	fs.unlinkSync(tmp_dir + fileName);

// 		// base64encode
// 	var file = success_dir + fileName;
// 	setTimeout(function(){
// 		var cashiers = fs.readFileSync(file, 'utf-8');
// 		var cashiersCDATA = '<![CDATA[ ' + cashiers + ' ]]>';
// 		console.log('cdata' + cashiersCDATA + '/n');
// 		ws_soap_cashiers(cashiersCDATA);
// 	}, 5000);
// };

// /*-----  End of edit and move XML cashiers  ------*/


// ================================================================
// =            send request to WS SET10 for            =
// ================================================================

// function ws_soap_cashiers (cashiersCDATA) {
// 	// ws soap config 
// // request for import cashiers
// var request_cashiers = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.cashiers.ERPIntegration.crystals.ru/">' +
// 					   '<soapenv:Header/>' +
// 					   '<soapenv:Body>' +
// 					    	'<ws:importCashiers>' +
// 						        '<xml>' + cashiersCDATA + '</xml>' +
// 						    '</ws:importCashiers>' +
// 						'</soapenv:Body>' +
// 						'</soapenv:Envelope>';

// 	var ctx = {
// 		request: request_cashiers,
// 		url: config.url_soap_cashiers,
// 		action: 'importCashiers',
// 		contentType: 'text/xml'
// 	};


// 	// var Http = ws.Http;
// 	var handlers = [new Http()];


// 	// собсно сам импорт по веб сервису
// 	ws.send(handlers, ctx, function(ctx){
// 		// ctx.response === 'true' ? console.log('Карты успешно добавлены!') : console.log('Ошибка импорта!!!');
// 		console.log(ctx);
// 	});
// };

// /*-----  End of send request to WS SET10 for cashiers  ------*/



/*===============================================
=            watching for source dir            =
===============================================*/

function parse(){
	// watching for cards
	var deployed = fs.existsSync(set10_deployed);
	if !deployed return;
	glob(source_dir + wildcard_cards + "*.xml", function(err, files){
		for (var file in files){
			var fileName = path.basename(files[file]);
			do_import_cards(fileName);
		};
	});

	// watching for advs
	glob(source_dir + wildcard_advs + "*.xml", function(err, files){
		for (var file in files){
			var fileName = path.basename(files[file]);
			do_import_advs(fileName);
		};
	});


	// watching for goods
	glob(source_dir + wildcard_goods + "*.xml", function(err, files){
		for (var file in files){
			var fileName = path.basename(files[file]);
			do_import_goods(fileName);
		};
	});


	// // watching for cashiers
	// glob(source_dir + wildcard_cashiers + "*.xml", function(err, files){
	// 	for (var file in files){
	// 		var fileName = path.basename(files[file]);
	// 		do_import_cashiers(fileName);
	// 	};
	// });
};
/*-----  End of watching for source dir  ------*/


setInterval(parse, timeout);



