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
	wildcard: "catalog-cards_",
	wildcard_adv: "advert-act-discs_",

	// soap parameters
	url_soap: "http://192.168.188.164:8090/SET-ERPIntegration/SET/WSCardsCatalogImport?wsdl",
	url_soap_adv: "http://192.168.188.164:8090/SET-ERPIntegration/AdvertisingActionsImport?wsdl"

};

module.exports=config