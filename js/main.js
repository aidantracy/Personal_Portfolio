
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



document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const sections = document.querySelectorAll(".section");
    let lastScrollPosition = 0;

    // Fade-in content on load
    main.classList.add("visible");

    // Observe sections for fading out while scrolling
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));

    // Hide navbar on scroll down, show on scroll up
    window.addEventListener("scroll", () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
            header.classList.add("hidden");
        } else {
            header.classList.remove("hidden");
        }

        lastScrollPosition = currentScrollPosition;
    });
});


// Function to create project card
function createProjectCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("project-image");
    
    if (project.project_image) {
        const testImage = new Image();
        testImage.onload = () => {
            imageContainer.style.backgroundImage = `url('${project.project_image}')`;
        };
        testImage.src = project.project_image;
    }

    const overlay = document.createElement("div");
    overlay.classList.add("project-overlay");

    const title = document.createElement("h3");
    title.textContent = project.id;

    const description = document.createElement("p");
    description.textContent = project.project_description;

    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("project-actions");

    const link = document.createElement("a");
    link.href = project.project_url;
    link.textContent = "Visit Project →";
    link.target = "_blank";
    link.classList.add("project-link");

    actionsContainer.appendChild(link);

    overlay.appendChild(title);
    overlay.appendChild(description);
    overlay.appendChild(actionsContainer);

    card.appendChild(imageContainer);
    card.appendChild(overlay);

    return card;
}

// Function to load and display projects
function loadProjects() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const projects = JSON.parse(xhr.responseText);
                const projectsContainer = document.getElementById("projects-preview");
                projectsContainer.innerHTML = "";
                projects.forEach((project) => {
                    projectsContainer.appendChild(createProjectCard(project));
                });
                
                // Update button state
                const showProjectsBtn = document.getElementById("show-projects");
                if (showProjectsBtn) {
                    showProjectsBtn.textContent = "Hide Projects";
                    showProjectsBtn.classList.add("active");
                }
            } catch (error) {
                console.error("Error parsing projects:", error);
            }
        } else {
            console.error("Error loading projects:", xhr.responseText);
        }
    });

    xhr.open("GET", "https://q8f4zchkua.execute-api.us-east-2.amazonaws.com/projects");
    xhr.send();
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    const showProjectsBtn = document.getElementById("show-projects");
    const projectsPreview = document.getElementById("projects-preview");
    
    if (showProjectsBtn && projectsPreview) {
        showProjectsBtn.addEventListener("click", function() {
            if (!this.classList.contains("active")) {
                loadProjects();
            } else {
                projectsPreview.innerHTML = "";
                this.textContent = "Show Projects";
                this.classList.remove("active");
            }
        });
    }

    // Set current year in footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});