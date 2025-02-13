document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    const volumeSlider = document.getElementById("volume-slider");

    if (!audio || !musicToggle || !volumeSlider) {
        console.error("❌ Problème : Éléments du lecteur audio introuvables !");
        return;
    }

    // 🔹 Initialisation du volume (muet pour contourner le blocage)
    audio.volume = 0.5;
    audio.muted = true; // Commencer muet pour éviter le blocage

    // 🔹 Essayer de jouer automatiquement la musique
    function playMusic() {
        audio.play().then(() => {
            console.log("✅ Musique démarrée automatiquement !");
        }).catch(error => {
            console.warn("⚠️ L'auto-play a été bloqué. Nécessite une interaction utilisateur.");
        });
    }
    playMusic();

    // 🔹 Quand l'utilisateur clique n'importe où, activer le son et jouer
    document.addEventListener("click", function enableSound() {
        audio.muted = false; // Activer le son après interaction
        audio.play().catch(error => console.error("❌ Erreur de lecture :", error));
        document.removeEventListener("click", enableSound); // Supprimer après activation
    });

    // 🔹 Bouton Play/Pause
    musicToggle.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            musicToggle.textContent = "🔊"; // Icône haut-parleur actif
        } else {
            audio.pause();
            musicToggle.textContent = "🔇"; // Icône haut-parleur coupé
        }
    });

    // 🔹 Changement du volume via le slider
    volumeSlider.addEventListener("input", function () {
        audio.volume = volumeSlider.value;
    });
});
