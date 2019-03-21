/**
 * Definisce un oggetto all'interno del quale inserire i dati provenienti dalle view.
 * È in grado di rendere persistenti i dati utilizzando lo store locale
 * @param prefix
 * @private
 */
function _APP (prefix) {
	this.data = {};
	this.prefix = prefix || 'module_';
	this.init();
}

_APP.prototype.set = function (key, value, store) {
	this.data[key] = value;
	if (store) {
		localStorage.setItem(this.prefix + key, JSON.stringify(value));
	}
};
_APP.prototype.get = function (key, from_store) {
	if (from_store) {
		var value = localStorage.getItem(this.prefix + key);
		try {
			return JSON.parse(value);
		} catch (e) {
			return value;
		}
	} else {
		return this.data[key] || null;
	}
};
_APP.prototype.delete = function (key, from_store) {
	delete this.data[key];
	if (from_store) {
		localStorage.removeItem(this.prefix + key);
	}
};
_APP.prototype.init = function () {
	for (var key in localStorage) {
		var k = key.split(this.prefix);
		if (k.length === 2) {
			this.data[k[1]] = this.get(k[1], true);
		}
	}
};
