/**
 * ----------------------------
 *  Configurazione di sviluppo
 * ----------------------------
 * impostare nel file .env
 * NODE_ENV=developement
 * oppure rimuovere la proprietà
 *
 * Da utilizzare durante lo sviluppo con DB sulla propria macchina
 */
module.exports = {
	db: {
		name: '<%= dbName %>',
		port: 27017,
		host: 'localhost',
	},
	port: 3001
};
