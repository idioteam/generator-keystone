const keystone = require('keystone');
const Types = keystone.Field.Types;
const keystoned = require('keystoned');

const cookie_select = {
	categoria: [
		{ value: 'NC', label: 'Non classificato' },
		{ value: 'TE', label: 'Tecnico' },
		{ value: 'AN', label: 'Analitico' },
		{ value: 'PR', label: 'Profilazione' },
	],
	um: [
		{ value: 'sessione', label: 'Sessione' },
		{ value: 'anno/i', label: 'Anno/i' },
		{ value: 'mese/i', label: 'Mese/i' },
		{ value: 'giorno/i', label: 'Giorno/i' },
	],
};

const Cookie = new keystone.List('CookiesList', {
	schema: { collection: 'cookies-list' },
	path: 'cookies-list',
	label: 'Cookie',
	singular: 'Cookie',
	plural: 'Cookies',
	map: { name: 'name' },
	autokey: {
		from: 'name domain',
		path: 'slug',
		unique: true,
	},
	nodelete: false,
	track: true,
	defaultSort: 'name domain',
});

Cookie.add({
		name: { type: String, initial: true, required: true, label: 'Nome' },
		path: { type: String, initial: true, default: '/', label: 'Path' },
		secure: { type: Boolean, initial: true, label: 'Sicuro' },
		categoria: { type: Types.Select, options: cookie_select.categoria, initial: true, required: true, label: 'Categoria' },
		descrizione: { type: String, initial: true, label: 'Descrizione' },
	},
	{ heading: 'Durata' },
	{
		durata: {
			um: { type: Types.Select, options: cookie_select.um, initial: true, required: true, label: 'Durata - Unità di misura' },
			qta: { type: Number, initial: true, required: true, default: 0, label: 'Durata - Quantità', dependsOn: { 'durata.um': ['anno/i', 'mese/i', 'giorno/i'] } },
		},
	},
	{ heading: 'Terza parte' },
	{
		terzaParte: { type: Boolean, initial: true, label: 'Terza parte' },
		domain: { type: String, initial: true, required: true, label: 'Dominio', default: 'localhost', dependsOn: { terzaParte: true }},
		linkDisattivazione: { type: String, label: 'Link disattivazione', dependsOn: { terzaParte: true } },
	},

);

Cookie.defaultColumns = 'name, domain, path, value, terzaParte, categoria, descrizione';

Cookie.schema.post('save', function () {
	keystoned.cookies.banner.genera();
});

Cookie.schema.post('remove', function () {
	keystoned.cookies.banner.genera();
});

Cookie.register();
//keystoned.cookies.banner.genera();
