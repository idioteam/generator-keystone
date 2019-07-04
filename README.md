# Keystone Generator

Un generatore [Yeoman](http://yeoman.io) per la versione personalizzata di [KeystoneJS](https://keystonejs.com) per NSI.

## Per iniziare

Innanzitutto è necessario avere installati Node.js >= 8.0 (suggerisco NVM, vedi la sezione **Dipendenze**) e MongoDB >= 3.2

Poi installa globalmente `yo` e questo package
````
$ npm i -g yo
$ npm i -g git+https://github.com/idioteam/generator-keystone-nsi.git
````

Crea una nuova cartella per il tuo progetto KeystoneJS e lancia il generatore:

````
$ mkdir myproject
$ cd myproject
$ yo keystone-nsi
````

Il generatore ti chiederà il nome del progetto e se vuoi generare una nuova cartella (nel caso in cui tu non lo abbia già fatto).

**Ricordati di modificare il link a Cloudinary nel file `.env`**


### E dopo?

Dai un'occhiata alla documentazione di [Keystone 4 ](https://keystonejs.com/getting-started/) per imparare ad utilizzare KeystoneJS.



## Dipendenze

### Installa Node.js tramite nvm

Scarica ed installa il gestore di versione di Node dalla [pagina di download di NVM](https://github.com/nvm-sh/nvm#installation-and-update) o quella di [NVM per Windows](https://github.com/coreybutler/nvm-windows).

Su Mac è possibile utilizzare anche [homebrew](https://brew.sh):
```
brew install nvm
```

### Installa MongoDB

Su Mac, il modo più facile per installare MongoDB è tramite [homebrew](https://brew.sh). Per installare `brew`, lancia questo comando nel terminale:

````
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
````

Installato Homebrew, lancia questo comando per scaricare ed installare MongoDB:

````
brew install mongodb
````

Potrebbe generare un errore:

'Warning: You have not agreed to the Xcode license.  Builds will fail! Agree to the license by opening Xcode.app or running: xcodebuild -license.'  Se leggi questo messaggio, esegui:

````
sudo xcodebuild -license
````

Premi 'invio', se richiede di leggere e accettare i termini della licenza, scorri in fondo con 'spazio' e digita 'agree'.

Per le altre piattaforme leggere [le guide di installazione di MongoDB](https://docs.mongodb.com/manual/installation/).


## Licenze

[MIT License](https://en.wikipedia.org/wiki/MIT_License). Copyright (c) 2018 Jed Watson.
