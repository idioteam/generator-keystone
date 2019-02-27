/**
 * Rimozione dell'eventuale slash finale nelle routes
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {

	// Verifico metodo della richiesta
	const method = req.method.toLowerCase();
	if (method !== 'get' && method !== 'head') {
		return next();
	}
	
	//	Verifico se esiste trailing slash ed eventualmente redirigo
	if(req.path.match(/\S+\/$/)) {
		res.redirect(301, req.path.slice(0, -1) + req.url.slice(req.path.length))
	} else {
		next();
	}

};
