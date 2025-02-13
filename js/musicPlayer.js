document.addEventListener("DOMContentLoaded", function () {
    const audio = new Audio("https://www.himely-puppy.ovh/music/background.mp3");
    audio.loop = true;
    audio.volume = localStorage.getItem("musicVolume") ? parseFloat(localStorage.getItem("musicVolume")) : 0.5;
    let isPlaying = localStorage.getItem("musicPlaying") === "true";

    const button = document.getElementById("toggle-music");
    const statusText = document.getElementById("music-status");
    const volumeSlider = document.getElementById("music-volume");

    volumeSlider.value = audio.volume;

    // 🔹 Fonction pour démarrer la musique après une interaction utilisateur
    function enableAutoPlay() {
        if (!isPlaying) {
            audio.play().then(() => {
                console.log("🎵 Musique démarrée !");
                localStorage.setItem("musicPlaying", "true");
                statusText.textContent = "Pause";
            }).catch(error => console.warn("🔇 Lecture automatique bloquée par le navigateur", error));
        }
        document.removeEventListener("click", enableAutoPlay);
    }

    // Ajoute un événement global sur le premier clic
    document.addEventListener("click", enableAutoPlay);

    // 🔹 Lecture si elle était active avant le changement de page
    if (isPlaying) {
        audio.play().catch(error => console.warn("🔇 Lecture automatique bloquée", error));
        statusText.textContent = "Pause";
    }

    // 🔹 Bouton Play/Pause
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

    // 🔹 Gestion du volume
    volumeSlider.addEventListener("input", function () {
        audio.volume = this.value;
        localStorage.setItem("musicVolume", this.value);
    });

    // 🔹 Empêcher l'arrêt de la musique en changeant de page
    window.addEventListener("beforeunload", function () {
        localStorage.setItem("musicPlaying", !audio.paused);
    });
});
