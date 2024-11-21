document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects-container");
    const form = document.getElementById("add-project-form");

    // Array to hold projects
    const projects = [];

    // Function to render projects
    function renderProjects() {
        projectsContainer.innerHTML = ""; // Clear container
        projects.forEach((project, index) => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");
            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="btn">View Project</a>
                <button class="btn delete-btn" data-index="${index}">Delete</button>
            `;
            projectsContainer.appendChild(projectCard);
        });

        // Add delete functionality
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                projects.splice(index, 1); // Remove project
                renderProjects(); // Re-render
            });
        });
    }

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("project-title").value;
        const description = document.getElementById("project-description").value;
        const link = document.getElementById("project-link").value;

        // Add new project to the array
        projects.push({ title, description, link });

        // Reset form and re-render projects
        form.reset();
        renderProjects();
    });
});
