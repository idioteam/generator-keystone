// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
const keystoned = require('keystoned');
keystoned.init({
	config: process.env.NODE_ENV
});

keystone.init({
	'name': '<%= projectName %>',
	'brand': '<%= projectName %>',
<% if (preprocessor === 'sass') { %>
	'sass': 'public',
<% } else if (preprocessor === 'less') { %>
	'less': 'public',
<% } else { %>
	'stylus': 'public',
<% } %>	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',<% if (viewEngine === 'nunjucks') { %>
	'view engine': '.html',
	'custom engine': cons.nunjucks,
<% } else if (viewEngine === 'hbs') { %>
	'view engine': '.hbs',
<% } else { %>
	'view engine': '<%= viewEngine %>',
<% } %><% if (viewEngine === 'hbs') { %>
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,
<% } else if (viewEngine == 'twig') { %>
	'twig options': { method: 'fs' },
	'custom engine': Twig.render,
<% } %><% if (includeEmail) { %>
	'emails': 'templates/emails',
<% } %>
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': '<%= userModel %>',
});
<% if (includeGuideComments) { %>
// Load your project's Models
<% } %>keystone.import('models');
<% if (includeGuideComments) { %>
// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
<% } %>keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
<% if (includeGuideComments) { %>
// Load your project's Routes
<% } %>keystone.set('routes', require('./routes'));

<% if (includeGuideComments) { %>
// Configure the navigation bar in Keystone's Admin UI
<% } %>keystone.set('nav', {
	<% if (includeBlog) { %>posts: ['posts', 'post-categories'],
	<% } if (includeGallery) { %>galleries: 'galleries',
	<% } if (includeEnquiries) { %>enquiries: 'enquiries',
	<% } if (userModelPath.includes('-')) { %>'<%= userModelPath %>'<% } else { %><%= userModelPath %><% } %>: '<%= userModelPath %>',
});
<% if (includeGuideComments) { %>
// Start Keystone to connect to your database and initialise the web server
<% } %>


keystone.start();
