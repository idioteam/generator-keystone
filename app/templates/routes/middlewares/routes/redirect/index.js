/**
 * Metodo di comodo per redirigere una route
 * @param redirect_path
 * @param redirect_code
 * @returns {function(*, *): (never|Response)}
 */
module.exports = function (redirect_path, redirect_code = 301) {
	return (req, res) => res.redirect(redirect_code, redirect_path);
};
