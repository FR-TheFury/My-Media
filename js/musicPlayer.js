document.addEventListener("DOMContentLoaded", function () {
    const audio = new Audio("https://www.himely-puppy.ovh/music/background.mp3");
    audio.loop = true; // Musique en boucle

    // Récupération des éléments HTML
    const playButton = document.getElementById("play-music");
    const pauseButton = document.getElementById("pause-music");
    const volumeSlider = document.getElementById("music-volume");

    // Charger le volume depuis le localStorage
    audio.volume = localStorage.getItem("musicVolume") ? parseFloat(localStorage.getItem("musicVolume")) : 0.5;
    volumeSlider.value = audio.volume;

    // Vérifier si la musique doit reprendre après un changement de page
    if (localStorage.getItem("musicPlaying") === "true") {
        audio.play().then(() => {
            playButton.style.display = "none";
            pauseButton.style.display = "inline-block";
        }).catch(error => console.warn("🔇 Impossible de démarrer la musique", error));
    }

    // 🔹 Démarrer la musique
    playButton.addEventListener("click", function () {
        audio.play().then(() => {
            localStorage.setItem("musicPlaying", "true");
            playButton.style.display = "none";
            pauseButton.style.display = "inline-block";
        }).catch(error => console.warn("🔇 Erreur lors du démarrage", error));
    });

    // 🔹 Mettre en pause la musique
    pauseButton.addEventListener("click", function () {
        audio.pause();
        localStorage.setItem("musicPlaying", "false");
        playButton.style.display = "inline-block";
        pauseButton.style.display = "none";
    });

    // 🔹 Ajuster le volume
    volumeSlider.addEventListener("input", function () {
        audio.volume = this.value;
        localStorage.setItem("musicVolume", this.value);
    });

    // 🔹 Sauvegarder l'état avant de quitter la page
    window.addEventListener("beforeunload", function () {
        localStorage.setItem("musicPlaying", !audio.paused);
    });
});
