module.exports = (req, res, next) => {
	
	const locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' }
	];
	
	next();
	
};
