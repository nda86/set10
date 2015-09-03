var config = require('./config.js');
var ws = require('ws.js');
var Http = ws.Http;


// request for import cards
var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.importing.plugins.cards.ERPIntegration.crystals.ru/">' + 
   '<soapenv:Header/>' + 
   '<soapenv:Body>' +
      '<web:getCardsCatalog>' +
         '<cardsCatalogXML>' + cards + '</cardsCatalogXML>' +
      '</web:getCardsCatalog>' +
   '</soapenv:Body>' +
'</soapenv:Envelope>';

var ctx = {
	request: request,
	url: config.url_soap,
	action: 'getCardsCatalog',
	contentType: 'text/xml'
};


var handlers = [new Http()];

ws.send(handlers, ctx, function(ctx){
	ctx.response ? console.log('Карты успешно добавлены!') : console.log('Ошибка импорта!!!');
});