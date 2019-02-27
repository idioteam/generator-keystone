/**
 * Esporto i middlewares in un unico oggetto
 * Leggo il contenuto della cartella corrente ed eseguo il require di file e cartelle ad eccezione di index.js (questo file)
 */
const middlewares = {};

require("fs").readdirSync(__dirname).forEach(function(file) {
	if (file !==('index.js')) {
		middlewares[file.replace('.js','')] = require("./" + file);
	}
});

module.exports = middlewares;
