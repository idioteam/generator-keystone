var keystone = require('keystone');
const moment = require('moment');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	locals.section = 'cookie';
	locals.cookies = get_empty_cookie_object();

	view.on('init', function (next) {

		keystone.list('CookiesList').model.aggregate(aggregation_query)
			.exec(function (err, result) {

				if (err) {
					console.error('Errore get lista cookies: ', err);
					next(err);
				}

				result.forEach(c => { locals.cookies.list[c._id][c.cookies.tp ? 'tp' : 'pp'] = c.cookies.lista });
				next();
			});

	});

	view.on('init', function (next) {
		keystone.list('CookiesList').model.findOne().sort({ updatedAt: -1 })
			.exec(function (err, result) {
				if (result) {
					locals.cookies.ultimoAggiornamento = moment(result.updatedAt).format('DD/MM/YYYY');
				}
				next(err);
			});
	});

	view.on('init', function (next) {

		keystone.list('CookiesContents').model.find({ stato: 'Attivo' }).sort({ sortOrder: 1 })
			.exec(function (err, result) {
				locals.cookies.pars = result;
				next(err);
			});

	});

	// Render the view
	view.render('policies/cookies');
};

// Ritorna l'oggetto per passare i dati dei cookie alle locals
function get_empty_cookie_object () {
	return {
		list: {
			TE: {
				nome: 'Cookie tecnici',
				codice: 'TE',
				descrizione: 'Strettamente necessari per il funzionamento del sito',
				pp: [],
				tp: [],
			},
			AN: {
				nome: 'Cookie analitici',
				codice: 'AN',
				descrizione: 'Tracciano le interazioni degli utenti sul sito in forma aggregata',
				pp: [],
				tp: [],
			},
			PR: {
				nome: 'Cookie di profilazione',
				codice: 'PR',
				descrizione: 'Tracciano le preferenze degli utenti sul sito in forma aggregata',
				pp: [],
				tp: [],
			},
			NC: {
				nome: 'Cookie non classificati',
				codice: 'NC',
				descrizione: 'La loro funzione non è descritta',
				pp: [],
				tp: [],
			},
		},
		ultimoAggiornamento: '',
		pars: [],
	};
}

const aggregation_query = [
	{
		$group: {
			_id: { categoria: '$categoria', tp: '$terzaParte' },
			cookies: {
				$push: '$$ROOT',
			},
		},
	},
	{
		$group: {
			_id: '$_id.categoria',
			cookies: {
				$push: {
					tp: '$_id.tp',
					lista: '$cookies',
				},
			},
		},
	},
	{ $unwind: '$cookies' },
]
