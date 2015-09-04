var config;
config = {
	// time of research
	timeout: 2000,
	// work pathts
	source_dir: "d:\\set\\import\\source\\",
	tmp_dir: "d:\\set\\import\\tmp\\",
	error_dir: "d:\\set\\import\\error\\",
	success_dir: "d:\\set\\import\\success\\",

	// wildcard of fileName
	wildcard_cards: "catalog-cards_",
	wildcard_advs: "advert-act-discs_",
	wildcard_goods: "catalog-goods_",
	wildcard_cashiers: "catalog-cashiers_",

	// soap parameters
	url_soap_cards: "http://192.168.188.164:8090/SET-ERPIntegration/SET/WSCardsCatalogImport?wsdl",
	url_soap_advs: "http://192.168.188.164:8090/SET-ERPIntegration/AdvertisingActionsImport?wsdl",
	url_soap_goods: "http://192.168.188.164:8090/SET-ERPIntegration/SET/WSGoodsCatalogImport?wsdl",
	url_soap_cashiers: "http://192.168.188.164:8090/SET-ERPIntegration/CashiersImport?wsdl"

};

module.exports=config