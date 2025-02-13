document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bg-music");
    const playButton = document.getElementById("play-music");
    const pauseButton = document.getElementById("pause-music");
    const volumeSlider = document.getElementById("music-volume");

    if (!audio || !playButton || !pauseButton || !volumeSlider) {
        console.error("❌ Un ou plusieurs éléments du lecteur audio sont introuvables !");
        return;
    }

    // 🔹 Jouer la musique
    playButton.addEventListener("click", function () {
        audio.play().then(() => {
            playButton.style.display = "none";
            pauseButton.style.display = "inline-block";
        }).catch(error => {
            console.error("🔇 Erreur lors du démarrage de la musique : ", error);
            alert("⚠️ Impossible de jouer la musique automatiquement ! Cliquez directement sur le bouton Play.");
        });
    });

    // 🔹 Mettre en pause
    pauseButton.addEventListener("click", function () {
        audio.pause();
        playButton.style.display = "inline-block";
        pauseButton.style.display = "none";
    });

    // 🔹 Modifier le volume
    volumeSlider.addEventListener("input", function () {
        audio.volume = this.value;
    });
});
