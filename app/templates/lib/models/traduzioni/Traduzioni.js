const keystone = require('keystone');
const keystoned = require('keystoned');
const objectNotation = keystoned.i18n.get_conf().objectNotation;
const Types = keystone.Field.Types;
const path = require('path');
const fs = require('fs');

let timer = null;
const timeout = 5000;	//	millisecondi di attesa prima di rigenerare i file JSON

const Traduzioni = new keystone.List('Traduzioni', {
	schema: { collection: 'traduzioni' },
	path: 'traduzioni',
	label: 'Traduzioni',
	singular: 'Traduzione',
	plural: 'Traduzioni',
	map: { name: 'chiave' },
	defaultSort: 'chiave',
});

Traduzioni.add({
	chiave: { type: String, unique: true },
	valore: { type: Types.Textarea, i18n: true },
});

Traduzioni.schema.pre('save', function (next) {
	this.chiave = keystone.utils.slug(this.chiave.trim().replace(/\./g, ' '), '.');
	next();
});
Traduzioni.defaultColumns = 'chiave, valore.it';

Traduzioni.schema.post('save', function () {
	Traduzioni.schema.statics.vocabolario_genera();
});

Traduzioni.schema.post('remove', function () {
	Traduzioni.schema.statics.vocabolario_genera();
});

Traduzioni.schema.statics.vocabolario_genera = function () {
	clearTimeout(timer);
	timer = setTimeout(() => { vocabolario_genera(); }, timeout);
};

Traduzioni.register();

function vocabolario_genera () {
	Traduzioni.model.find().sort({ chiave: 1 }).exec((err, results) => {

		let vocabolario = {};
		const locales = keystone.get('locales').map(l => l.locale);
		//	per ciascun locale crea un oggetto corrispondente al locale all'interno del vocabolario
		locales.forEach(l => (vocabolario[l] = {}));

		if (objectNotation) {
			//	Vocabolario in ObjectNotation
			vocabolario = vocabolario_objectNotation(results, locales, vocabolario);
		} else {
			// Vocabolario piatto
			vocabolario = vocabolario_flat(results, locales, vocabolario);
		}

		locales.forEach(l => {
			fs.writeFile(path.join(keystone.get('module root'), 'locales', l + '.json'), JSON.stringify(vocabolario[l], null, 2), (err) => {
				if (err) {
					return console.log(err);
				}
			});
		});
	});

	function vocabolario_objectNotation (results, locales, vocabolario) {
		results.forEach(r => {
			locales.forEach(v => {
				r.chiave.split('.').reduce((acc, k, idx, keys) => {
					if (!acc[k]) {
						acc[k] = {};
					}

					if (idx === keys.length - 1) {
						acc[k] = r.valore[v];
					} else {
						if (typeof acc[k] !== 'object') {
							acc[k] = {};
						}
					}
					return acc[k];
				}, vocabolario[v]);
			});
		});
		return vocabolario;
	}

	function vocabolario_flat (results, locales, vocabolario) {
		results.forEach(r => {
			locales.forEach(v => {
				vocabolario[v][r.chiave] = r.valore[v];
			});
		});
		return vocabolario;
	}
}

