/**
 * ----------------------------
 *  Configurazione di sviluppo
 * ----------------------------
 * impostare nel file .env
 * NODE_ENV=developement
 * oppure rimuovere la proprietà
 *
 * Da utilizzare durante lo sviluppo
 */
module.exports = {
	db: {
		name: '<%= projectName %>',
		port: 27017,
		host: 'idiocloud',
	},
	port: 3001
};
