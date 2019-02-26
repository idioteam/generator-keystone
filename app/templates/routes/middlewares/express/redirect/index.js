module.exports = function (redirect_path, redirect_code = 301) {
	return (req, res) => res.redirect(redirect_code, redirect_path);
};
