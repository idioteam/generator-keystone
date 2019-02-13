exports.create = {
	CookiesList: [
		{ categoria: 'TE', name: 'consenso-cookies', terzaParte: false, 'durata.um': 'anno/i', 'durata.qta': 1, secure: false, path: '/' },
	],
	CookiesBanner: [
		{ chiave: 'background', valore: '#FFFFFF', info: 'Colore di sfondo del banner' },
		{ chiave: 'textColor', valore: '#393939', info: 'Colore del testo' },
		{ chiave: 'linkColor', valore: '#393939', info: 'Colore del link' },
		{ chiave: 'posizione', valore: '2', info: 'Posizione del banner (0 = in alto, 1 = al centro, 2 = in basso)' },
		{ chiave: 'borderRadius', valore: '10', info: 'Raggio del bordo del banner (applicato se posizione = 1)' },
		{ chiave: 'backdrop', valore: false, info: 'Visualizza uno sfondo sotto al banner (true/false)'},
		{ chiave: 'backdropColor', valore: '#000000', info: 'Colore dello sfondo sotto al banner'},
		{ chiave: 'backdropOpacity', valore: '.4', info: 'Opacità dello sfondo sotto al banner (accetta valori decimali tra 0 e 1 - es: .5 .34 .9'},
	]
}