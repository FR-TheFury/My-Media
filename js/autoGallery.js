document.addEventListener("DOMContentLoaded", function () {
    const galleries = [
        { id: "galleryMain", folderId: "1OwartWamWeCqdsKpUy1D1B1VhisYsYLx" }, // ID de GalleryMain
        { id: "galleryFig", folderId: "15SG6-OX3sa4qV5PTevKl74hkpG3XOvo_" }, // ID de GalleryFig
        { id: "galleryPrint", folderId: "1hUe3DTeGVczB6iRXA0IT5Nmj57H370MH" }  // ID de GalleryPrint
    ];

    const API_KEY = "AIzaSyB5WsFxRU6G95rjFliPZM0suaRTfrCu0xI"; // Remplace avec ta clé API

    function fetchImages(galleryId, folderId) {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.files) return;
                const galleryContainer = document.getElementById(galleryId);

                data.files.forEach(file => {
                    if (file.mimeType.startsWith("image/")) {
                        const imgSrc = `https://drive.google.com/uc?export=view&id=${file.id}`;

                        const card = document.createElement("div");
                        card.classList.add("card");

                        const imageWrapper = document.createElement("div");
                        imageWrapper.classList.add("card-image-wrapper");

                        const img = document.createElement("img");
                        img.src = imgSrc;
                        img.alt = file.name;
                        img.onerror = function () {
                            this.src = "https://via.placeholder.com/300"; 
                        };

                        imageWrapper.appendChild(img);
                        card.appendChild(imageWrapper);
                        galleryContainer.appendChild(card);
                    }
                });
            })
            .catch(error => console.error("Erreur lors du chargement des images :", error));
    }

    galleries.forEach(gallery => fetchImages(gallery.id, gallery.folderId));
});
