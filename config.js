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

	// soap parameters
	url_soap: "http://{host}:{port}/SET-ERPIntegration/SET/WSCardsCatalogImport?wsdl"

};

module.exports=config