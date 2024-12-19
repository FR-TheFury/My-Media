// popup.js

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const acceptButton = document.getElementById("accept");
    const rejectButton = document.getElementById("reject");

    // Ensure the body stays blurred until the popup is accepted
    document.body.style.filter = "blur(10px)"; // Apply blur to the entire body
    document.body.style.overflow = "hidden"; // Prevent scrolling

    acceptButton.addEventListener("click", () => {
        popup.style.display = "none"; // Hide the popup
        document.body.style.filter = "none"; // Remove the blur
        document.body.style.overflow = "auto"; // Allow scrolling
    });

    rejectButton.addEventListener("click", () => {
        window.location.href = "../index.html"; // Redirect to index.html
    });
});
