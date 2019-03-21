let pug_utils = {
	parse_attrs: require('./attributes'),
};

//	Importo lazyload
pug_utils = Object.assign(pug_utils, require('./lazyload'));

module.exports = (req, res, next) => {
	res.locals.pug_utils = pug_utils;
	if (next) {
		next();
	}
};
