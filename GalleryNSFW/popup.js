// popup.js

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const mainContent = document.getElementById("main-content");
    const acceptButton = document.querySelector(".accept");
    const rejectButton = document.querySelector(".reject");

    acceptButton.addEventListener("click", () => {
        popup.style.display = "none";
        mainContent.classList.remove("blurred");
    });

    rejectButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});