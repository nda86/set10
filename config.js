var config;
config = {
	// time of research
	timeout: 2000,
	// work pathts
	source_dir: "c:\\Users\\NDA\\Desktop\\project\\source\\",
	tmp_dir: "c:\\Users\\NDA\\Desktop\\project\\tmp\\",
	error_dir: "c:\\Users\\NDA\\Desktop\\project\\error\\",
	success_dir: "c:\\Users\\NDA\\Desktop\\project\\success\\",
	// wildcard of fileName
	wildcard: "catalog-cards_",

	// soap parameters
	url_soap: "http://{host}:{port}/SET-ERPIntegration/SET/WSCardsCatalogImport?wsdl"

};

module.exports=config