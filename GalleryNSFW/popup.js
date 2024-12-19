document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const acceptButton = document.getElementById("accept");
    const rejectButton = document.getElementById("reject");

    // Ensure the popup is visible at the start
    popup.style.display = "flex"; // Make the popup visible
    document.body.style.overflow = "hidden"; // Prevent scrolling
    document.body.style.filter = "blur(10px)"; // Apply blur to the body

    acceptButton.addEventListener("click", () => {
        popup.style.display = "none"; // Hide the popup
        document.body.style.filter = "none"; // Remove blur from the body
        document.body.style.overflow = "auto"; // Allow scrolling
    });

    rejectButton.addEventListener("click", () => {
        window.location.href = "../index.html"; // Redirect to index.html
    });
});