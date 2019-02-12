const keystone = require('keystone');
const Types = keystone.Field.Types;

const CookiesContents = new keystone.List('CookiesContents', {
	schema: { collection: 'cookies-contents' },
	path: 'cookies-contents',
	label: 'Paragrafi',
	singular: 'Paragrafo',
	plural: 'Paragrafi',
	map: { name: 'titolo' },
	defaultSort: 'sortOrder',
	sortable: true,
});

CookiesContents.add({
	titolo: { type: String, initial: true },
	testo: { type: Types.Html, wysiwyg: true, initial: true },
	stato: { type: Types.Select, options: 'Attivo, Non Attivo', default: 'Attivo', initial: true },
});

CookiesContents.defaultColumns = 'titolo, stato';
CookiesContents.register();
