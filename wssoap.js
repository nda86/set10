var config = require('./config.js');
var ws = require('ws.js');
var Http = ws.Http;
var cards = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8Y2FyZHMtY2F0YWxvZz4NCgk8aW50ZXJuYWwtY2FyZCBudW1iZXI9IjAzMDkyMDE1IiBhbW91bnQ9IjAuMCIgZXhwaXJhdGlvbi1kYXRlPSIyMDUwLTEyLTAzIg0Kc3RhdHVzPSJBQ1RJVkUiIGRlbGV0ZWQ9ImZhbHNlIiBwZXJjZW50YWdlLWRpc2NvdW50PSIyNSIvPg0KPC9jYXJkcy1jYXRhbG9nPg==';

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
	console.log("response " + ctx.response);
})