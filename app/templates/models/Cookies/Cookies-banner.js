const keystone = require('keystone');
const keystoned = require('keystoned');

const CookieBanner = new keystone.List('CookiesBanner', {
	schema: { collection: 'cookies-banner' },
	path: 'cookies-banner',
	label: 'Banner',
	singular: 'Impostazione Banner',
	plural: 'Impostazioni Banner',
	map: { name: 'chiave' },
	autokey: {
		from: 'chiave',
		path: 'slug',
		unique: true,
	},
	nodelete: true,
	nocreate: true,
	defaultSort: 'chiave',
});

CookieBanner.add({
	chiave: { type: String, initial: true, noedit: true, required: true, label: 'Chiave' },
	valore: { type: String, initial: true, required: true, label: 'Valore' },
	info: { type: String, label: 'Descrizione', noedit: true },
});

CookieBanner.defaultColumns = 'chiave, valore, info';

CookieBanner.schema.post('save', function() {
	keystoned.cookies.banner.genera();
});
CookieBanner.register();

