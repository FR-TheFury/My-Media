document.addEventListener("DOMContentLoaded", function () {
    let audio = new Audio("https://www.himely-puppy.ovh/music/background.mp3");
    audio.loop = true; // Musique en boucle

    // Récupération des éléments HTML
    const playButton = document.getElementById("play-music");
    const pauseButton = document.getElementById("pause-music");
    const volumeSlider = document.getElementById("music-volume");

    // Vérifier si la musique était en cours avant un changement de page
    if (sessionStorage.getItem("musicPlaying") === "true") {
        audio.play().then(() => {
            playButton.style.display = "none";
            pauseButton.style.display = "inline-block";
        }).catch(error => console.warn("🔇 Impossible de démarrer la musique automatiquement", error));
    }

    // 🔹 Démarrer la musique quand on clique sur Play
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

    // 🔹 Empêcher la musique de s'arrêter entre les pages
    window.addEventListener("beforeunload", function () {
        sessionStorage.setItem("musicPlaying", !audio.paused);
    });
});
