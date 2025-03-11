document.addEventListener("DOMContentLoaded", function () {
    const galleries = [
        { id: "galleryMain", folderId: "15SG6-OX3sa4qV5PTevKl74hkpG3XOvo_" },
        { id: "galleryFig", folderId: "1OwartWamWeCqdsKpUy1D1B1VhisYsYLx" },
        { id: "galleryPrint", folderId: "1hUe3DTeGVczB6iRXA0IT5Nmj57H370MH" },
        { id: "galleryGif", folderId: "1ON0h93n--3cGcCG7LzIZO99QXJnBPelB" } // Galerie GIF
    ];

    const API_KEY = "AIzaSyB5WsFxRU6G95rjFliPZM0suaRTfrCu0xI";
    const FALLBACK_IMAGE = "/My-Media/img/fallback.png"; // Image de secours

    function fetchImages(galleryId, folderId, nextPageToken = "") {
        let url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents`
            + `&key=${API_KEY}&fields=nextPageToken,files(id,name,mimeType)`
            + `&corpora=user&supportsAllDrives=true&pageSize=50`;

        if (nextPageToken) url += `&pageToken=${nextPageToken}`;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (!data.files || data.files.length === 0) {
                    console.warn(`⚠️ Aucune image trouvée dans ${galleryId}`);
                    return;
                }

                const galleryContainer = document.getElementById(galleryId);
                if (!galleryContainer) {
                    console.error(`❌ Élément avec l'ID '${galleryId}' introuvable.`);
                    return;
                }

                data.files.forEach(file => {
                    if (galleryId === "galleryGif" && !file.mimeType.includes("gif")) {
                        console.warn(`🚨 Ignoré : ${file.name} car ce n'est pas un GIF.`);
                        return;
                    }

                    const imgSrc = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;

                    const card = document.createElement("div");
                    card.classList.add("card");

                    const imageWrapper = document.createElement("div");
                    imageWrapper.classList.add("card-image-wrapper");

                    const img = document.createElement("img");
                    img.src = imgSrc;
                    img.alt = file.name;
                    img.loading = "lazy";

                    img.onerror = function () {
                        this.src = FALLBACK_IMAGE; // Image de secours
                    };

                    // 🔹 Ajoute une classe temporaire pour l'animation de flip
                    img.classList.add("flip-animation");

                    img.onload = function () {
                        setTimeout(() => {
                            img.classList.remove("flip-animation");
                            img.classList.add("flipped");
                        }, 200);
                    };

                    imageWrapper.appendChild(img);
                    card.appendChild(imageWrapper);
                    galleryContainer.appendChild(card);
                });

                // Si Google Drive a plus d'images, continuer à paginer
                if (data.nextPageToken) {
                    fetchImages(galleryId, folderId, data.nextPageToken);
                }

                // 🔹 Appliquer l'effet de parallaxe après le chargement des images
                setTimeout(() => {
                    activateParallax();
                }, 500);
            })
            .catch(error => console.error(`❌ Erreur lors du chargement des images pour ${galleryId}:`, error));
    }

    galleries.forEach(gallery => fetchImages(gallery.id, gallery.folderId));
});

/**
 * 🎥 Ajoute un effet de parallaxe aux images
 */
function activateParallax() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(parallax);
}

function parallax(card) {
    const wrapper = card.querySelector('.card-image-wrapper');
    const diff = card.offsetHeight - wrapper.offsetHeight;
    const { top } = card.getBoundingClientRect();
    const progress = top / window.innerHeight;
    const yPos = diff * progress;
    wrapper.style.transform = `translateY(${yPos}px)`;
}

window.addEventListener('scroll', activateParallax, false);
window.addEventListener('resize', activateParallax, false);
