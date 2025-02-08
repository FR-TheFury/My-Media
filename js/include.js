function includeHTML() {
    document.querySelectorAll("[data-include]").forEach(el => {
        fetch(el.getAttribute("data-include"))
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data;
                adjustRelativeLinks(); // Appel pour corriger les liens
            })
            .catch(error => console.error("Erreur d'inclusion:", error));
    });
}

function adjustRelativeLinks() {
    document.querySelectorAll("a.nav-item, .dropdown-item").forEach(link => {
        let basePath = "/My-Media/"; // Assurez-vous que c'est le bon chemin racine
        if (!link.href.includes(window.location.origin)) {
            link.href = new URL(link.getAttribute("href"), window.location.origin + basePath).href;
        }
    });
}

document.addEventListener("DOMContentLoaded", includeHTML);
