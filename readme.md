# BadgeBot - Bot de Badgage Automatique

**BadgeBot** est un script pour automatiser le processus de badgage sur Eurecia.

## Fonctionnalités

- **Automatisation du badgage** : Le bot clique automatiquement sur le bouton de badgage à des heures spécifiques.
- **Plage horaire flexible** : Une marge de tolérance permet d'effectuer le badgage proche des heures définies.
- **Prévention de la mise en veille** : Simule une activité pour empêcher le navigateur de se mettre en veille.
  
## Pré-requis

- Accès à l'interface web où le badgage doit être effectué

## Installation
### Tampermonkey
#### Automatique

Le lien ci-dessous devrait vous emmener sur la page d'installation du script sur Tampermonkey : [tampermonkey_BadgeBotMain.user.js](https://github.com/xalsie/eureciaBot/raw/main/tampermonkey_BadgeBotMain.user.js)

Si cette méthode ne fonctionne pas, je vous invite à utiliser la méthode manuelle.

#### Manuelle

Il est possible d'utiliser Tampermonkey pour charger ce script automatiquement, pour cela vous avez besoin de [TamperMonker](https://tampermonkey.net/).

Ensuite il vous suffit de cliquer sur l'icone de Tampermonkey puis de cliquer sur "Dashboard". Une fois dans le panneau d'administration de vos scripts, vous devez aller dans l'onglet "Utilities" et dans la partie "URL", entrez le lien suivant:

```
https://github.com/xalsie/eureciaBot/raw/main/tampermonkey_BadgeBotMain.user.js
```

Puis cliquez sur "Import".
