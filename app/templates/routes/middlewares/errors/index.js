/**
 * Assegna alla response i metodi per gestire gli errori
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {

	res.not_found = (title, message) => {
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
