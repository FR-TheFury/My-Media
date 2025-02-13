document.addEventListener("DOMContentLoaded", function () {
    const audio = new Audio("/music/background.mp3"); // Vérifie bien le chemin du fichier !
    audio.loop = true;
    audio.volume = localStorage.getItem("musicVolume") ? parseFloat(localStorage.getItem("musicVolume")) : 0.5;
    let isPlaying = localStorage.getItem("musicPlaying") === "true";

    const button = document.getElementById("toggle-music");
    const statusText = document.getElementById("music-status");
    const volumeSlider = document.getElementById("music-volume");

    // Appliquer le volume sauvegardé
    volumeSlider.value = audio.volume;

    // Démarrer la musique si elle était active avant
    if (isPlaying) {
        audio.play().catch(error => console.warn("🔇 Lecture automatique bloquée", error));
        statusText.textContent = "Pause";
    }

    // Gérer le bouton Play/Pause
    button.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            localStorage.setItem("musicPlaying", "true");
            statusText.textContent = "Pause";
        } else {
            audio.pause();
            localStorage.setItem("musicPlaying", "false");
            statusText.textContent = "Play";
        }
    });

    // Gestion du volume
    volumeSlider.addEventListener("input", function () {
        audio.volume = this.value;
        localStorage.setItem("musicVolume", this.value);
    });

    // Empêcher l'arrêt de la musique en changeant de page
    window.addEventListener("beforeunload", function () {
        localStorage.setItem("musicPlaying", !audio.paused);
    });
});
