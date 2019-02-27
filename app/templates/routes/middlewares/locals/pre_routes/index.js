/**
 * Imposta le locals della response in fase pre routes
 * queste locals sono disponibili nei templates, anche in caso di errore
 *
 */
const keystone = require('keystone');

module.exports = (req, res, next) => {

	const locals = res.locals;

	//	dati dalla request
	locals.user = req.user;
	locals.path = req.path;

	//	dati da keystone
	locals.impostazioni = ks_get('impostazioni');
	locals.privacy_links = keystone.get('privacy_links');

	next();
};

function ks_get (key) {
	let test = keystone.get(key);
	return test ? test : null
}
