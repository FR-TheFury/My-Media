document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    const volumeSlider = document.getElementById("volume-slider");

    if (!audio || !musicToggle || !volumeSlider) {
        console.error("❌ Problème : Éléments du lecteur audio introuvables !");
        return;
    }

    // 🔹 Initialisation du volume
    audio.volume = 0.5;

    // 🔹 Essayer de jouer automatiquement la musique
    function playMusic() {
        audio.play().catch(error => {
            console.warn("⚠️ L'auto-play a été bloqué par le navigateur. Nécessite une interaction utilisateur.");
        });
    }
    playMusic();

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