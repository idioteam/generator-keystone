exports.create = {
	Impostazioni: [
		//	Azienda
		{ chiave: 'azienda.nome',         			valore: '',      info: 'Ragione sociale o nome'},
		{ chiave: 'azienda.piva',         			valore: '',      info: 'Partita IVA'},
		{ chiave: 'azienda.cf',           			valore: '',      info: 'Codice fiscale'},
		//	Contatti
		{ chiave: 'contatti.email',        			valore: '',      info: 'Email principale'},
		{ chiave: 'contatti.telefono',     			valore: '',      info: 'Recapito telefonico principale'},
		{ chiave: 'contatti.fax',          			valore: '',      info: 'Fax principale'},
		//	Indirizzo
		{ chiave: 'indirizzo.via',    				valore: '',      info: 'Via/Piazza e civico'},
		{ chiave: 'indirizzo.cap',          		valore: '',      info: 'CAP'},
		{ chiave: 'indirizzo.comune',       		valore: '',      info: 'Comune'},
		{ chiave: 'indirizzo.provincia',    		valore: '',      info: 'Provincia'},
		{ chiave: 'indirizzo.stato',      			valore: 'Italy', info: 'Stato'},
		{ chiave: 'indirizzo.stato_sigla',  		valore: 'IT',    info: 'Stato'},
		//	Sito
		{ chiave: 'sito.nome',         				valore: '',		info: 'Nome del sito'},
		{ chiave: 'sito.url',          				valore: '',     info: 'Indirizzo del sito'},
		//	Loghi
		{ chiave: 'logo.sito', 						valore: '', 	info: 'Indirizzo logo base' },
		{ chiave: 'logo.alternativo', 				valore: '', 	info: 'Indirizzo logo alternativo' },
		{ chiave: 'logo.social', 					valore: '', 	info: 'Indirizzo logo per social' },
		{ chiave: 'logo.signin', 					valore: '', 	info: 'Indirizzo logo per pagina di login. Se non impostato viene utilizzato il logo base' },
		{ chiave: 'logo.email', 					valore: '', 	info: 'Indirizzo logo incluso nelle mail. Se non impostato viene utilizzato il logo base' },
		//	Social
		{ chiave: 'social.facebook', 				valore: '', 	info: 'Pagina facebook' },
		{ chiave: 'social.linkedin', 				valore: '', 	info: 'Pagina linkedin' },
		{ chiave: 'social.youtube', 				valore: '', 	info: 'Pagina youtube' },
		{ chiave: 'social.twitter', 				valore: '', 	info: 'Pagina twitter' },
		{ chiave: 'social.pinterest', 				valore: '', 	info: 'Pagina pinterest' },
		{ chiave: 'social.g+', 						valore: '', 	info: 'Pagina google+' },
		//	EMAIL
        { chiave: 'mail.mittente.indirizzo',    	valore: '', info: 'Indirizzo del mittente delle mail inviate agli utenti' },
        { chiave: 'mail.mittente.nome',         	valore: '', info: 'Nome del mittente delle mail inviate agli utenti' },
        { chiave: 'mail.destinatario',     			valore: '', info: 'Indirizzo del destinatario delle mail inviate dagli utenti' },
		// SEO
		{ chiave: 'seo.title', 						valore: '', 	info: 'Titolo di default' },
		{ chiave: 'seo.description', 				valore: '', 	info: 'Meta description di default' },
        //	Policies
        { chiave: 'policies.privacy', 				valore: '/policies/privacy', info: 'Indirizzo dell pagina contenente la privacy policy' },
        { chiave: 'policies.cookie',  				valore: '/policies/cookies', info: 'Indirizzo dell pagina contenente la cookie policy' },
        { chiave: 'policies.titolare.nome',  		valore: '', info: 'Titolare del trattamento dei dati della privacy' },
        { chiave: 'policies.titolare.indirizzo',  	valore: '', info: 'Indirizzo del titolare del trattamento dei dati della privacy' },
        { chiave: 'policies.titolare.telefono',  	valore: '', info: 'Telefono del titolare del trattamento dei dati della privacy' },
        { chiave: 'policies.titolare.email',  		valore: '', info: 'Email del titolare del trattamento dei dati della privacy' },
        { chiave: 'policies.dpo.email',  			valore: '', info: 'Email del RPD-DPO' },
	]
};
