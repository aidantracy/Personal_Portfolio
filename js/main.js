
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const responseDiv = document.getElementById("formResponse");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        // Collect form data
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
        };

        // Mock processing or validation
        console.log("Form submitted:", formData);

        // Simulate a successful submission
        form.reset(); // Clear the form
        responseDiv.classList.remove("hidden"); // Show success message
    });
});
