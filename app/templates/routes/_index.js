/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('keystone');
const keystoned = require('keystoned');
const middlewares = require('./middlewares');

// Middlewares
// Pre routes
keystoned.i18n.middlewares.browse();
keystone.pre('routes', middlewares.routes.remove_trailing_slash);
keystone.pre('routes', middlewares.errors);
keystone.pre('routes', middlewares.locals.pre_routes);
keystone.pre('routes', middlewares.cookies);
// Pre render
keystone.pre('render', middlewares.pug);
// keystone.pre('render', middlewares.flash_messages);

// Import Route Controllers
const importRoutes = keystone.importer(__dirname);
const routes = {
	api: importRoutes('./api'),
	policies: importRoutes('./policies'),
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	const middlewares = [keystoned.seo.middleware];
	keystoned.i18n.routes.init(app);
	
	// Views
	keystoned.i18n.routes.set('/', middlewares, routes.views.index);
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

	//	Policies
	app.get('/policies/cookies', routes.policies.cookies);
	app.get('/policies/:id', routes.policies.privacy);
	
	// Sitemap
	app.get('/sitemap.xml', function (req, res) {
		keystoned.sitemap.create(keystone, req, res, {
			filters: {
				Post: { state: 'published' },
			},
			ignore: [
				'^\/api.*$',
				'\/*-policy',
				'\/privacy*',
				'\/emails',
			],
		});
	});

};
