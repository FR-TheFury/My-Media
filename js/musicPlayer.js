document.addEventListener("DOMContentLoaded", function () {
    const audio = new Audio("/music/background.mp3"); // Vérifie bien ce chemin !
    audio.loop = true; // Lecture en boucle
    audio.volume = localStorage.getItem("musicVolume") ? parseFloat(localStorage.getItem("musicVolume")) : 0.5;
    let isPlaying = localStorage.getItem("musicPlaying") === "true";

    const button = document.getElementById("toggle-music");
    const statusText = document.getElementById("music-status");
    const volumeSlider = document.getElementById("music-volume");

    // Appliquer le volume initial
    volumeSlider.value = audio.volume;

    // ⚠️ Autoriser la lecture après un clic utilisateur
    document.body.addEventListener("click", function () {
        if (!isPlaying) {
            audio.play().catch(error => console.warn("🔇 Lecture automatique bloquée", error));
            isPlaying = true;
            localStorage.setItem("musicPlaying", "true");
            statusText.textContent = "Pause";
        }
    }, { once: true });

    // Jouer la musique si elle était activée avant
    if (isPlaying) {
        audio.play().catch(error => console.warn("🔇 Lecture automatique bloquée", error));
        statusText.textContent = "Pause";
    }

    // Bouton Play/Pause
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

    // Contrôle du volume
    volumeSlider.addEventListener("input", function () {
        audio.volume = this.value;
        localStorage.setItem("musicVolume", this.value);
    });
});
