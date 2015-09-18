var pg = require('pg');
var prompt = require('prompt');
var conString = "postgres://postgres:12345@localhost/set";
pg.connect(conString, function(err, client, done){
	if (err) return console.error('error fetching client from pool', err);
	client.query('SELECT * FROM public.un_cg_max_discount_percent_restrictions', function(err, result){
		if (err) console.error('error running query', err);
		if (result.rows.length === 0){
			console.log('В таблице нет записей!');	
			client.end();
			return;
		} 
		// client.end();
		// prompt.start();
		// console.log("Вы уверены что хотите удалить," + result.rows.length + " записей? [yes/no]");
		// prompt.get(['x'], function(err, result){
			// if (result.x === 'yes'){
				console.log('Удаляем ВСЕ записи...');
				client.query('DELETE FROM public.un_cg_max_discount_percent_restrictions', function(err, result){
					if (err) return console.error('error running query', err);
					console.log('Все записи успешно удалены');
					client.end();
				});
			// }else {
				// console.log('Отмена удаления');
				// client.end();
				// return;
			// }
		// })
	});
});

