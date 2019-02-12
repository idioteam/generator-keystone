const keystone = require('keystone');
const Types = keystone.Field.Types;

const PrivacyContents = new keystone.List('PrivacyContents', {
	schema: { collection: 'privacy-contents' },
	path: 'privacy-contents',
	label: 'Paragrafi',
	singular: 'Paragrafo',
	plural: 'Paragrafi',
	map: { name: 'titolo' },
	defaultSort: 'sortOrder',
	sortable: true,
	sortContext: 'PrivacyPolicies:paragrafi',
});

PrivacyContents.add({
	policy: { type: Types.Relationship, ref: 'PrivacyPolicies', initial: true, required: true },
	titolo: { type: String, initial: true },
	testo: { type: Types.Html, wysiwyg: true, initial: true },
	stato: { type: Types.Select, options: 'Attivo, Non Attivo', default: 'Attivo', initial: true },
});

PrivacyContents.defaultColumns = 'titolo, policy, stato';
PrivacyContents.register();
