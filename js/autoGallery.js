document.addEventListener("DOMContentLoaded", function () {
    const galleries = [
        { id: "galleryMain", folderId: "15SG6-OX3sa4qV5PTevKl74hkpG3XOvo_" },
        { id: "galleryFig", folderId: "1OwartWamWeCqdsKpUy1D1B1VhisYsYLx" },
        { id: "galleryPrint", folderId: "1hUe3DTeGVczB6iRXA0IT5Nmj57H370MH" }
    ];

    const API_KEY = "AIzaSyB5WsFxRU6G95rjFliPZM0suaRTfrCu0xI";

    function fetchImages(galleryId, folderId) {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)&corpora=user&supportsAllDrives=true`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data.files || data.files.length === 0) {
                    console.warn(`Aucune image trouvée dans ${galleryId}`);
                    return;
                }

                const galleryContainer = document.getElementById(galleryId);
                if (!galleryContainer) {
                    console.error(`Élément avec l'ID '${galleryId}' introuvable.`);
                    return;
                }

                data.files.forEach(file => {
                    if (file.mimeType.startsWith("image/")) {
                        const imgSrc = `https://lh3.googleusercontent.com/d/${file.id}=s800`;
                    
                        const card = document.createElement("div");
                        card.classList.add("card");
                    
                        const imageWrapper = document.createElement("div");
                        imageWrapper.classList.add("card-image-wrapper");
                    
                        const img = document.createElement("img");
                        img.src = imgSrc;
                        img.alt = file.name;
                    
                        img.onerror = function () {
                            this.src = "/My-Media/assets/images/fallback.jpg"; // Image de secours
                        };
                    
                        imageWrapper.appendChild(img);
                        card.appendChild(imageWrapper);
                        galleryContainer.appendChild(card);
                    } else {
                        console.warn(`Le fichier ${file.name} n'est pas une image.`);
                    }
                    
                });
            })
            .catch(error => console.error(`Erreur lors du chargement des images pour ${galleryId}:`, error));
    }

    galleries.forEach(gallery => fetchImages(gallery.id, gallery.folderId));
});
