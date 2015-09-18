var config;
config = {
	// time of research
	timeout: 2000,
	// dir for set10
	set10_deployed: "c:\\Program Files (x86)\\SetRetail10\\standalone\\deployments\\Set10.ear.deployed",
	// work pathts
	source_dir: "c:\\set10_xml\\source\\",
	tmp_dir: "c:\\set10_xml\\tmp\\",
	error_dir: "c:\\set10_xml\\error\\",
	success_dir: "c:\\set10_xml\\success\\",


	// smarket xml folder
	smarket_xml: "\\\\192.168.0.76\\Kassa200",
	// wildcard of fileName
	wildcard_cards: "catalog-cards_",
	wildcard_advs: "advert-act-discs_",
	wildcard_goods: "catalog-goods_",
	// wildcard_cashiers: "catalog-cashiers_",

	// soap parameters
	url_soap_cards: "http://localhost:8090/SET-ERPIntegration/SET/WSCardsCatalogImport?wsdl",
	url_soap_advs: "http://localhost:8090/SET-ERPIntegration/AdvertisingActionsImport?wsdl",
	url_soap_goods: "http://localhost:8090/SET-ERPIntegration/SET/WSGoodsCatalogImport?wsdl",
	// url_soap_cashiers: "http://localhost:8090/SET-ERPIntegration/CashiersImport?wsdl"

};

module.exports=config