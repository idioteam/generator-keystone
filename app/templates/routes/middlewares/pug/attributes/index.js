/**
 * Analizza gli attributi e li riorganizza in un oggetto in modo da raggruppare tutti gli attributi con un medesimo prefisso
 * gli attributi senza oggetto vengono assegnati alla proprietà "main"
 * @param attributes
 * @param separatore
 * @returns {{main: {}}}
 * per esempio assegnando i seguenti attributi al mixin
 * +heading('h1', cnt, 'ipso facto', 'dum loquimur')(label_class='lbl' sub_={class:'qwee', style: 'color: red'} sub_id='mario' sub_class='red' class= 'main' )
 * si ottiene un oggetto 
 * {
 *     label: {
 *         class: 'lbl'
 *     },
 *     main: {
 *         class: 'main'
 *     }
 *     sub: {
 *         class: 'red',
 *         style: 'color: red', 
 *         id: 'mario'
 *     }
 * }
 */
function parse_attrs (attributes, separatore = '_') {
	const attrs = { main: {} };
	for (let attr in attributes) {
		if (attr.includes(separatore)) {
			var tmp = attr.split(separatore);
			if (!attrs[tmp[0]]) {
				attrs[tmp[0]] = {};
			}
			if (tmp[1] !== '') {
				attrs[tmp[0]][tmp.slice(1).join(separatore)] = attributes[attr];
			} else {
				attrs[tmp[0]] = attributes[attr];
			}
		} else {
			attrs.main[attr] = attributes[attr];
		}
	}
	return attrs;
}

module.exports = parse_attrs;
