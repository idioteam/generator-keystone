const keystone = require('keystone');
const Types = keystone.Field.Types;

const Impostazioni = new keystone.List('Impostazioni', {
	schema: { collection: 'impostazioni' },
	path: 'impostazioni',
	label: 'Impostazioni',
	singular: 'Impostazione',
	plural: 'Impostazioni',
	map: { name: 'chiave'},
	autokey: {
		from: 'chiave',
		path: 'slug',
		unique: true,
	},
	nodelete: true,
	defaultSort :'chiave'
});

Impostazioni.add({
	chiave: { type: String, initial: true, noedit: true, required: true, label: 'Chiave' },
	valore: { type: String, initial: true, label: 'Valore' },
	info: { type: String, label: 'Descrizione', noedit: true }
});

Impostazioni.defaultColumns = 'chiave, valore, info';

// - Metodi sullo schema 
// -----------------------------------------------------------------------//
// -----------------------------------------------------------------------//

//	Metodo statico per gestire l'aggiornamento della variabile globale
Impostazioni.schema.statics.aggiorna = function () {
	
	keystone.list('Impostazioni').model.find().sort({ chiave: 1 })
		.exec(function (err, settings_docs) {

			if (err || settings_docs.length === 0) {
				return;
			}

			const settings = {};
			settings_docs.forEach(setting => {
				setting_set.call(settings, setting.chiave, setting.valore);
			});

			//	Completamento dati
			if (settings.azienda && settings.azienda.nome && !settings.azienda.nome_breve) {
				settings.azienda.nome_breve = settings.azienda.nome;
			}

			_autocompleta_loghi(settings);
			if (settings.indirizzo) {
				settings.indirizzo.completo = _autocompleta_indirizzo(settings.indirizzo);
			}
			_autocompleta_responsabile_privacy(settings);

			keystone.set('impostazioni', settings);

		})
	
};

//	Trasforma il valore di chiave rendendolo simile ad un oggetto
Impostazioni.schema.pre('save', function (next) {
	// this.chiave = keystone.utils.slug(this.chiave.trim(), '.');
	this.chiave = keystone.utils.slug(this.chiave.trim().replace(/\./g, ' '), '.');
	next();
});

//	Dopo il salvataggio richiede l'aggiornamento della variabile globale
Impostazioni.schema.post('save', function () {
	Impostazioni.schema.statics.aggiorna();
});

//	Dopo la rimozione richiede l'aggiornamento della variabile globale
Impostazioni.schema.post('remove', function () {
	Impostazioni.schema.statics.aggiorna();
});

Impostazioni.register();

//	Subito dopo la registrazione del modello richiamo l'aggiornamento della variabile globale
Impostazioni.schema.statics.aggiorna();

// - Utilità varie
// -----------------------------------------------------------------------//
// -----------------------------------------------------------------------//

//	Aggiunge una chiave alla variabile globale dei settings
function setting_set (chiave, valore) {
	
	if (chiave.indexOf('.') === -1) {
		this[chiave] = valore; 
	} else {
		chiave = chiave.split('.');
		if (typeof this[chiave[0]] !== 'object') {
			this[chiave[0]] = {};
		}
		setting_set.call (this[chiave.shift()], chiave.join('.'), valore);
	}
	
}

//	Se nelle impostazioni esiste l'oggetto logo
//	verifica ed assegna logo per login e logo per mail
function _autocompleta_loghi (settings) {

	if (settings.logo) {

		// logo da inserire nell'interfaccia di login
		settings.logo.signin = settings.logo.signin || settings.logo.sito;
		if (settings.logo.signin) {
			keystone.set('signin logo', [settings.logo.signin, 238]);
		}
		// logo da includere nelle mail
		settings.logo.email = settings.logo.email || settings.logo.sito;

	}
}

//	Verifica ed imposta dati del responsabile della privacy
function _autocompleta_responsabile_privacy (settings) {

	if (settings.policies && settings.policies.titolare) {
		settings.policies.titolare.nome = settings.policies.titolare.nome || settings.azienda.nome;
		settings.policies.titolare.indirizzo = settings.policies.titolare.indirizzo || settings.indirizzo.completo;
		settings.policies.titolare.telefono = settings.policies.titolare.telefono || settings.indirizzo.telefono;
		settings.policies.titolare.telefono = settings.policies.titolare.telefono || settings.contatti.telefono;
		settings.policies.titolare.email = settings.policies.titolare.email || settings.contatti.email;
	}

}

//	Imposta indirizzo completo 
function _autocompleta_indirizzo (indirizzo) {
	
	if (indirizzo) {
		return `${indirizzo.via || ''} ${indirizzo.cap ? '- ' + indirizzo.cap : ''} ${indirizzo.comune ? '- ' + indirizzo.comune : ''} ${indirizzo.provincia ? '(' + indirizzo.provincia + ')' : ''}`;
	} else {
		return '';
	}
}
