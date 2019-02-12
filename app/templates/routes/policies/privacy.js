const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	// Set locals
	locals.section = 'privacy';

	view.on('init', (next) => {
		keystone.list('PrivacyPolicies').model.findOne({ key: req.params.id, stato: 'Attiva' })
			.exec((err, result) => {

				if (err || !result) {
					// next(err);
					return res.not_found();
				}

				keystone.list('PrivacyContents').model.find({ policy: result._id, stato: 'Attivo' }).sort({ sortOrder: 1 })
					.exec((err, paragrafi) => {

						if (err || !result) {
							return res.not_found();
						}

						locals.paragrafi = paragrafi.map(p => dati_inserisci(p, res.locals.it_globals));
						next();
					});

			});

	});

	view.render('policies/privacy');

};

function dati_inserisci (s, dati) {

	s.titolo = dati_replace(s.titolo, dati);
	s.testo = dati_replace(s.testo, dati);

	return s;

	function dati_replace (s, dati) {
		const regex = /\[(.+?)\]/g;
		let placeholders;

		while ((placeholders = regex.exec(s))) {
			s = s.replace(placeholders[0], dati_get_value(placeholders[1], dati));
		}

		return s;
	}

	function dati_get_value (placeholder, dati) {

		const p = placeholder.split('.').reduce((acc, p) => {
			if (acc[p]) {
				return acc[p] || dati;
			} else {
				return acc;
			}
		}, Object.assign({}, dati));

		return (typeof p === 'object' || !p) ? '' : p;
	}
}
