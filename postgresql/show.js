var pg = require('pg');
var conString = "postgres://postgres:171086@localhost/set";
pg.connect(conString, function(err, client, done){
	if (err) return console.error('error fetching client from pool', err);
	client.query('SELECT * FROM public.un_cg_max_discount_percent_restrictions', function(err, result){
		if (err) return console.error('error running query', err);
		console.log(result.rows);
		console.log('Всего записей: ', result.rows.length);
		client.end();
	});
});