// ==UserScript==
// @name         eurecia Badge Automator
// @description  Automatise le badgage sur Eurecia aux heures souhaitées (matin et soir) pour éviter d'oublier de le faire manuellement.
// @version      0.0.3.1
// @author       🐻｜LeGrizzly - legrizzly_0341
// @match        https://plateforme.eurecia.com/eurecia/index.html#/dashboard
// @icon         https://plateforme.eurecia.com/eurecia/assets/favicon.svg
// @namespace    https://github.com/xalsie/eureciaBot
// ==/UserScript==

;(function () {
    "use strict"

    class BadgeBot {
        constructor(morningHour, eveningHour, marginMinutes) {
            this.morningHour = morningHour // Heure du matin pour badger (format 24h)
            this.eveningHour = eveningHour // Heure du soir pour badger (format 24h)
            this.marginMinutes = marginMinutes // Marge de tolérance (en minutes)
            this.switchSelector = "#switch-time-clock" // Sélecteur du bouton de badgage
        }

        // Méthode pour vérifier l'état actuel de la checkbox
        isChecked() {
            return document.querySelector(this.switchSelector).classList.contains("ea-switch--enable")
        }

        // Méthode pour cliquer sur le bouton de badgage si nécessaire
        toggleBadge() {
            if (!this.isChecked()) {
                document.querySelector(this.switchSelector).click()
                console.log("Badgé avec succès")
            } else {
                console.log("Déjà badgé")
            }
        }

        // Vérifier si l'heure actuelle est dans la plage autorisée
        isWithinTimeRange(targetHour) {
            const now = new Date()
            const currentHour = now.getHours()
            const currentMinutes = now.getMinutes()

            // Calcule la marge de début et de fin en fonction de la tolérance
            const lowerBoundMinutes = targetHour * 60 - this.marginMinutes
            const upperBoundMinutes = targetHour * 60 + this.marginMinutes

            // Convertir l'heure actuelle en minutes
            const currentTotalMinutes = currentHour * 60 + currentMinutes

            // Vérifier si l'heure actuelle est dans la plage
            return currentTotalMinutes >= lowerBoundMinutes && currentTotalMinutes <= upperBoundMinutes
        }

        // Vérifier l'heure et badger si nécessaire
        autoBadge() {
            if (this.isWithinTimeRange(this.morningHour)) {
                console.log("Temps pour le badgage du matin.")
                this.toggleBadge()
            } else if (this.isWithinTimeRange(this.eveningHour)) {
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
    const bot = new BadgeBot(9, 17, 60) // 9h pour le matin et 17h pour le soir, avec une marge de 60 minutes
    bot.start()
})()
