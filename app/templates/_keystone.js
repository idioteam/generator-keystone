// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

const keystoned = require('keystoned');
keystoned.init({
	config: process.env.NODE_ENV,
	i18n: false,
	minify_js: true,
	model_queries: true,
	sitemap: true,
});

keystone.init({
	'name': '<%= projectName %>',
	'brand': '<%= projectName %>',
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '<%= viewEngine %>',

	'emails': 'templates/emails',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': '<%= userModel %>',
});

//	Applica configurazioni
keystoned.config.init();

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	start_time: '?_t=' + keystone.get('start_time')
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
const nav = {
	'cookie policy': ['CookiesContents', 'CookiesList', 'CookiesBanner'],
	'privacy policy': ['PrivacyPolicies', 'PrivacyContents'],
	'impostazioni': ['Impostazioni', 'users']
};
//	Modelli condizionali
if (keystone.lists.Traduzioni) {
	nav.impostazioni.push('Traduzioni');
}
//	Ordino il gruppo impostazioni
nav.impostazioni.sort();

keystone.set('nav', nav);

// Start Keystone to connect to your database and initialise the web server
keystone.start({
	onMount: function () {
		
		if (keystone.get('env') === 'production' && keystoned.minify_js) {
			keystoned.minify_js.minify();
		}
		
		if (keystoned && keystoned.cookies) {
			keystoned.cookies.banner.genera();
		}
		
		if (keystone.list('PrivacyPolicies')) {
			keystone.list('PrivacyPolicies').schema.statics.get_links();
		}
		
	},
	onHttpServerCreated: function () {
		//
	},
	onHttpsServerCreated: function () {
		//
	},
	onStart: function () {
		//
	},
});
