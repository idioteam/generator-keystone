/**
 * Imposta gli attributi per attivare il lazyload su immagini di sfondo
 * @param src
 * @returns {{'data-bg': string, class: string}}
 */
const lazy_bg = function (src) {
	return {
		class: 'lazy',
		'data-bg': `url(${src})`
	}
};

module.exports = {
	lazy_bg
};
