<%= projectName %>
=====================

Hai generato una installazione di KeystoneJS usando un generatore forkato.  
Non solo ci sono tante cose in più, ma alcune potrebbero funzionare.

# Fork di KeystoneJS
Questo generatore utilizza una copia forkata di KeystoneJS che include alcuni miglioramenti (forse) tra cui
- Aggiunta del tipo di campo Files per l'upload di file multipli
- Aggiunta della proprietà "note" alle proprietà della lista. Consente di inserire un testo (anche HTML) con istruzioni su quello che fa la lista. Il testo viene visualizzato nella UI quando l'utente accede ad un elemento della lista. Il pulsante per visualizzare il testo è nella intestazione.
- Aggiunta della proprietà "alt" ai campi CloudinaryImage e CloudinaryImages per gestire l'attributo alt
- Aggiunta del plugin per il conteggio dei caratteri ai campi HTML
- Aggiunta della proprietà "showOn" alla definizione dei campi. Funziona e si configura come "dependsOn", ma invece di rimuovere il campo dalla pagina lo nasconde. Di conseguenza durante il salvataggio il campo viene postato.
- Integrazione di pug-bem in pug per facilitare l'uso di bem

# Installazione di Keystoned
Questo generatore installa il modulo Keystoned che integra alcune utilità che vengono impostate dal generatore:
- config utilizza file di configurazione in base al valore della variabile NODE_ENV
- minify-js: consente di minificare i file js in produzione
- sitemap: genera la sitemap del sito
- ne verranno altri come seo, i18n, chache query, generazione css
 
# Fork del generatore
Il generatore aggiunge un po' di materiale tipo.
- cartella cert: cartella con un certificato (errato) per i test in locale
- cartella config: cartella con file di configurazione
- modello 'Impostazioni' per gestire dati generali (con file di update allo startup)
- installa bootstrap 4 al posto del 3
- installa un plugin per il lazyload delle immagini
- utilizza il file offcanvas.js per gestire il menù responsive
- reinclude i modelli delle mail che erano stati rimossi (templates/emails/layout)
- aggiunge mixin di pug
- utilizza middleware per rimozione trailing slash
- predispone res.not_found e res.server_error per gestire errori 404 e 500, con relativi template
- predispone la sitemap (routes/index)
