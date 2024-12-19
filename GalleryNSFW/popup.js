// popup.js

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const acceptButton = document.getElementById("accept");
    const rejectButton = document.getElementById("reject");

    acceptButton.addEventListener("click", () => {
        popup.style.display = "none"; // Hide the popup
        document.body.style.filter = "none"; // Remove the blur
        document.body.style.overflow = "auto"; // Allow scrolling
    });

    rejectButton.addEventListener("click", () => {
        window.location.href = "../index.html"; // Redirect to index.html
    });
});
