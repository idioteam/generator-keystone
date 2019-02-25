let cookie_preferenze_utente = 'preferenze-cookies';

/**
 * Aggiunge all'elenco dei cookies una proprietà per semplificare la gestione delle preferenze dell'utente
 * @param cookies_list - oggetto contenente i cookies, tipicamente express.cookies
 * @param numero_cookies_censiti - numero di cookies. se 0 il banner non viene visualizzato
 */
function parse_cookies (cookies_list, numero_cookies_censiti) {
	//	Strutturo oggetto da ritornare
	cookies_list = Object.assign({}, cookies_list);
	cookies_list = {
		list: Object.assign({}, cookies_list),
		auth: {
			analitici: false,
			profilazione: false
		},
		show_banner: numero_cookies_censiti,
	};
	const cookie_preferenze = cookies_list.list[cookie_preferenze_utente];
	if (cookie_preferenze) {
		cookies_list.auth = {
			analitici: cookie_preferenze_utente.includes('ANA'),
			profilazione: cookie_preferenze_utente.includes('PRA'),
		}
	}
	return cookies_list;
}

module.exports = (nome_cookie_preferenze_utente) => {
	cookie_preferenze_utente = nome_cookie_preferenze_utente || cookie_preferenze_utente;
	return parse_cookies;
};
