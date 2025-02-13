document.addEventListener("DOMContentLoaded", function () {
    const audio = new Audio("/My-Media/music/background.mp3"); // Mets ici le bon chemin de ton fichier audio
    audio.loop = true; // Lecture en boucle
    audio.volume = localStorage.getItem("musicVolume") ? parseFloat(localStorage.getItem("musicVolume")) : 0.5; // Récupérer le volume
    let isPlaying = localStorage.getItem("musicPlaying") === "true";

    const button = document.getElementById("toggle-music");
    const statusText = document.getElementById("music-status");
    const volumeSlider = document.getElementById("music-volume");

    // Appliquer le volume initial
    volumeSlider.value = audio.volume;

    // Jouer la musique si elle était activée précédemment
    if (isPlaying) {
        audio.play();
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
