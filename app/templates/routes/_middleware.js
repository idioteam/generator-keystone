/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var keystone = require('keystone');
const pug_utils = require('./middlewares/pug');

/**
	Initialises the standard view locals<% if (includeGuideComments) { %>

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.<% } %>
*/
exports.initLocals = function (req, res, next) {

	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' }
	];
	res.locals.user = req.user;

	//	Rendo disponibile ai template la variabile env
	res.locals.env = keystone.get('env');
	//	il path della pagina
	res.locals.path = req.path;
	//	le impostazioni del progetto
	res.locals.impostazioni = keystone.get('impostazioni');
	//	il numero di cookies presenti nella cookie policy
	res.locals.mostra_banner_cookies = keystone.get('mostra_banner_cookie');
	//	Importo utility di pug
	res.locals.pug_utils = pug_utils;
	
	//	Metodi per la gestione di errori 404 e 500
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


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
