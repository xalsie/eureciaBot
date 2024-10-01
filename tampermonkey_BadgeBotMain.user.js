// ==UserScript==
// @name         eurecia Badge Automator
// @description  Automatise le badgage sur Eurecia aux heures souhaitées (matin et soir) pour éviter d'oublier de le faire manuellement.
// @version      0.1.0
// @author       🐻｜LeGrizzly - legrizzly_0341
// @match        https://plateforme.eurecia.com/eurecia/index.html#/dashboard
// @icon         https://plateforme.eurecia.com/eurecia/assets/favicon.svg
// @namespace    https://github.com/xalsie/eureciaBot
// ==/UserScript==

;(function () {
    "use strict"

    class BadgeBot {
        constructor(morningHour, eveningHour, marginSecondes) {
            this.morningHour = morningHour // Heure du matin pour badger (format 24h)
            this.eveningHour = eveningHour // Heure du soir pour badger (format 24h)
            this.marginSecondes = marginSecondes // Marge de tolérance (en secondes)

            this.morningHourBadge = false // Indique si le badgage du matin a déjà été effectué
            this.eveningHourBadge = false // Indique si le badgage du soir a déjà été effectué
        }

        // Méthode pour cliquer sur le bouton de badgage si nécessaire
        toggleBadge = async () => {
            const response = await fetch("https://plateforme.eurecia.com/eurecia/api/v2/timeClock/statuses", {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                    priority: "u=1, i",
                    "sec-ch-ua": '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                },
                referrer: "https://plateforme.eurecia.com/eurecia/index.html",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: null,
                method: "PUT",
                mode: "cors",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("Statut du badgage:", json)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        // Vérifier si l'heure actuelle est dans la plage autorisée
        isWithinTimeRange(targetHour) {
            const now = new Date()
            const currentHour = now.getHours()
            const currentSeconds = now.getSeconds()

            // Calcule la marge de début et de fin en fonction de la tolérance en secondes
            const lowerBoundSecodes = (targetHour - this.marginSecondes) * 60
            const upperBoundSecodes = (targetHour + this.marginSecondes) * 60

            // Convertir l'heure actuelle en secondes
            const currentTotalSeconds = currentHour * 3600 + currentSeconds * 60

            // Vérifier si l'heure actuelle est dans la plage
            return currentTotalSeconds >= lowerBoundSecodes && currentTotalSeconds <= upperBoundSecodes
        }

        // Vérifier l'heure et badger si nécessaire
        autoBadge() {
            if (this.isWithinTimeRange(this.morningHour) && !this.morningHourBadge) {
                console.log("Temps pour le badgage du matin.")
                this.toggleBadge()
            } else if (this.isWithinTimeRange(this.eveningHour) && !this.eveningHourBadge) {
                console.log("Temps pour le badgage du soir.")
                this.toggleBadge()
            } else {
                console.log("Pas encore l'heure de badger.")
            }
        }

        // Simuler une activité dans le navigateur
        preventSleep() {
            setInterval(() => {
                window.dispatchEvent(new Event("mousemove")) // Simule un mouvement de souris
                console.log("Activité simulée pour éviter la mise en veille")
            }, 50000) // Toutes les 50 secondes
        }

        // Empêcher la mise en veille du navigateur
        keepAwake = async () => {
            try {
                const wakeLock = await navigator.wakeLock.request("screen")
                console.log("Wake Lock activé")
            } catch (err) {
                console.error("Échec de l'activation du Wake Lock:", err)

                this.preventSleep()
            }
        }

        // Méthode pour démarrer le bot
        start() {
            // Exécuter la fonction toutes les minutes pour vérifier l'heure
            setInterval(() => {
                this.autoBadge()
            }, 60000) // 60000 ms = 1 minute

            this.keepAwake() // Empêche la mise en veille du navigateur
        }
    }

    // Instanciation du bot avec les heures de badgage souhaitées
    const bot = new BadgeBot(9, 17, 60) // 9h pour le matin et 17h pour le soir, avec une marge de 60 secondes
    bot.start()
})()
