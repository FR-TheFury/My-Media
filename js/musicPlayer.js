document.addEventListener("DOMContentLoaded", function () {
    const audio = new Audio("https://www.himely-puppy.ovh/music/background.mp3");
    audio.loop = true; // La musique tourne en boucle
    audio.volume = localStorage.getItem("musicVolume") ? parseFloat(localStorage.getItem("musicVolume")) : 0.5;
    let isPlaying = localStorage.getItem("musicPlaying") === "true";

    const button = document.getElementById("toggle-music");
    const statusText = document.getElementById("music-status");
    const volumeSlider = document.getElementById("music-volume");

    volumeSlider.value = audio.volume;

    // 🔹 Play/Pause manuel (pas d'autoplay au chargement)
    button.addEventListener("click", function () {
        if (audio.paused) {
            audio.play().then(() => {
                console.log("🎵 Musique démarrée !");
                localStorage.setItem("musicPlaying", "true");
                statusText.textContent = "Pause";
            }).catch(error => console.warn("🔇 Impossible de démarrer la musique", error));
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

    // 🔹 Mémoriser si la musique était en lecture avant le changement de page
    window.addEventListener("beforeunload", function () {
        localStorage.setItem("musicPlaying", !audio.paused);
    });
});
