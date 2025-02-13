document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const playButton = document.getElementById("play-music");
    const pauseButton = document.getElementById("pause-music");
    const volumeSlider = document.getElementById("music-volume");

    // Récupérer l'état de la musique après changement de page
    if (sessionStorage.getItem("musicPlaying") === "true") {
        audio.play().catch(error => console.warn("🔇 Impossible de démarrer la musique automatiquement", error));
        playButton.style.display = "none";
        pauseButton.style.display = "inline-block";
    }

    // 🔹 Démarrer la musique
    playButton.addEventListener("click", function () {
        audio.play().then(() => {
            sessionStorage.setItem("musicPlaying", "true");
            playButton.style.display = "none";
            pauseButton.style.display = "inline-block";
        }).catch(error => {
            console.error("🔇 Erreur lors du démarrage de la musique : ", error);
            alert("⚠️ Impossible de jouer la musique automatiquement ! Cliquez directement sur le bouton Play.");
        });
    });

    // 🔹 Mettre en pause la musique
    pauseButton.addEventListener("click", function () {
        audio.pause();
        sessionStorage.setItem("musicPlaying", "false");
        playButton.style.display = "inline-block";
        pauseButton.style.display = "none";
    });

    // 🔹 Ajuster le volume
    volumeSlider.addEventListener("input", function () {
        audio.volume = this.value;
        sessionStorage.setItem("musicVolume", this.value);
    });

    // Appliquer le volume enregistré
    if (sessionStorage.getItem("musicVolume")) {
        audio.volume = parseFloat(sessionStorage.getItem("musicVolume"));
        volumeSlider.value = audio.volume;
    }
});
