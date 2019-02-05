//	Metodi per la gestione di errori 404 e 500

const keystone = require('keystone');

keystone.set('404', function (req, res, next) {
	res.not_found();
});

module.exports = function (req, res, next) {

	res.not_found = function (title, message) {
		res.status(404).render('errors/404', {
			title: title,
			message: message,
		});
	};

	res.server_error = function (title, message) {
		res.status(500).render('errors/500', {
			title: title,
			message: message,
		});
	};

	next();

};
