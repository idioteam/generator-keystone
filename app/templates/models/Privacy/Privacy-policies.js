const keystone = require('keystone');
const Types = keystone.Field.Types;

const PrivacyPolicies = new keystone.List('PrivacyPolicies', {
	schema: { collection: 'privacy-policies' },
	path: 'privacy-policies',
	label: 'Privacy policies',
	singular: 'Privacy policy',
	plural: 'Privacy policies',
	map: { name: 'nome' },
	sortable: true,
	defaultSort: 'sortOrder',
});

PrivacyPolicies.add({
	nome: { type: String, required: true },
	key: { type: Types.Key },
	stato: { type: Types.Select, options: 'Attiva, Non Attiva', default: 'Attiva' },
});

PrivacyPolicies.defaultColumns = 'nome, stato';
PrivacyPolicies.relationship({ ref: 'PrivacyContents', path: 'paragrafi', refPath: 'policy' });

PrivacyPolicies.schema.pre('save', function (next) {

	let _this = this;
	if (!this.key) {
		_this.key = keystone.utils.slug(_this.nome);
	}

	next();

});

PrivacyPolicies.schema.post('save', aggiorna_privacy_links);
PrivacyPolicies.schema.post('update', aggiorna_privacy_links);

PrivacyPolicies.register();
aggiorna_privacy_links();

function aggiorna_privacy_links (next) {
	keystone.list('PrivacyPolicies').model.find({}).sort({ sortOrder: 1 }).exec((err, pp) => {

		keystone.set('privacy_links', pp);
		if (next && typeof next === 'function') {
			next();
		}

	});
}
