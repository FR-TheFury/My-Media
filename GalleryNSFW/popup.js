// popup.js

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const acceptButton = document.getElementById("accept");
    const rejectButton = document.getElementById("reject");

    // Ensure the popup is visible at the start
    popup.style.display = "flex"; // Make the popup visible
    document.body.style.overflow = "hidden"; // Prevent scrolling
    document.body.classList.add("blurred"); // Add a class to blur the body

    acceptButton.addEventListener("click", () => {
        popup.style.display = "none"; // Hide the popup
        document.body.classList.remove("blurred"); // Remove the blur class
        document.body.style.overflow = "auto"; // Allow scrolling
    });

    rejectButton.addEventListener("click", () => {
        window.location.href = "../index.html"; // Redirect to index.html
    });
});
