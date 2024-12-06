// Sample projects data
const baseProjects = [
    {
        id: "Evil Circle Game",
        project_description: "A fun web application game created in CS408 at Boise State University.",
        project_url: "https://github.com/aidantracy/cs408-lab-9",
        project_image: "img/evil-circle.jpg"
    },
    {
        id: "Zig Huffman Encoder",
        project_description: "A file compression tool created in the Zig programming language.",
        project_url: "https://github.com/aidantracy/huffman_encoder",
        project_image: "img/zig-file-compress.jpg"
    },
    {
        id: "Programming Language",
        project_description: "An interpretive programming language made from scratch.",
        project_url: "https://github.com/aidantracy/Interpreter_Language",
        project_image: "img/prog-lang.jpg"
    }
];

// Function to show toast notifications
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

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

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteProject(project.id);

    actionsContainer.appendChild(link);
    actionsContainer.appendChild(deleteButton);

    overlay.appendChild(title);
    overlay.appendChild(description);
    overlay.appendChild(actionsContainer);

    card.appendChild(imageContainer);
    card.appendChild(overlay);

    return card;
}

// Load and display all projects
function loadProjects() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const projects = JSON.parse(xhr.responseText);
                const projectsContainer = document.getElementById("projects-container");
                projectsContainer.innerHTML = "";
                projects.forEach((project) => {
                    projectsContainer.appendChild(createProjectCard(project));
                });
            } catch (error) {
                console.error("Error parsing projects:", error);
                showToast("Error loading projects. Please try again.");
            }
        } else {
            console.error("Error loading projects:", xhr.responseText);
            showToast("Error loading projects. Please try again.");
        }
    });

    xhr.open("GET", "https://q8f4zchkua.execute-api.us-east-2.amazonaws.com/projects");
    xhr.send();
}

// Delete a project
function deleteProject(projectId) {
    if (!projectId) return;

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://q8f4zchkua.execute-api.us-east-2.amazonaws.com/projects/${projectId}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.addEventListener("load", function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            showToast("Project deleted successfully");
            loadProjects();
        } else {
            console.error("Error deleting project:", xhr.responseText);
            showToast("Error deleting project. Please try again.");
        }
    });
    
    xhr.send();
}

// Load sample projects
function loadSampleProjects() {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";

    const promises = baseProjects.map(project => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", "https://q8f4zchkua.execute-api.us-east-2.amazonaws.com/projects");
            xhr.setRequestHeader("Content-Type", "application/json");
            
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve();
                } else {
                    reject(new Error(`Failed to add project: ${project.id}`));
                }
            };
            
            xhr.onerror = () => reject(new Error(`Network error for project: ${project.id}`));
            xhr.send(JSON.stringify(project));
        });
    });

    Promise.all(promises)
        .then(() => {
            showToast("Sample projects loaded successfully!");
            loadProjects();
            const loadBtn = document.getElementById("load-projects");
            loadBtn.disabled = true;
            loadBtn.textContent = "Projects Loaded";
            loadBtn.classList.add("btn-disabled");
        })
        .catch(error => {
            console.error("Error loading sample projects:", error);
            showToast("Error loading sample projects. Please try again.");
        });
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Load existing projects
    loadProjects();

    // Setup load sample projects button
    const loadProjectsBtn = document.getElementById("load-projects");
    if (loadProjectsBtn) {
        loadProjectsBtn.addEventListener("click", loadSampleProjects);
    }

    // Setup add project form
    const addProjectForm = document.getElementById("add-project-form");
    if (addProjectForm) {
        addProjectForm.addEventListener("submit", function(event) {
            event.preventDefault();
    
            const projectTitle = document.getElementById("project-title").value.trim();
            const projectDescription = document.getElementById("project-description").value.trim();
            const projectUrl = document.getElementById("project-link").value.trim();
            // const projectImage = document.getElementById("project-image").value.trim() || "img/default-project.jpg";
            const projectImage = "img/default-project.jpg";
    
            if (!projectTitle || !projectDescription || !projectUrl) {
                showToast("All fields are required!");
                return;
            }
    
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", "https://q8f4zchkua.execute-api.us-east-2.amazonaws.com/projects");
            xhr.setRequestHeader("Content-Type", "application/json");
            
            xhr.addEventListener("load", function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    showToast("Project added successfully!");
                    addProjectForm.reset();
                    loadProjects();
                } else {
                    console.error("Error adding project:", xhr.responseText);
                    showToast("Error adding project. Please try again.");
                }
            });
    
            const projectData = {
                id: projectTitle,
                project_description: projectDescription,
                project_url: projectUrl,
                project_image: projectImage
            };

            xhr.send(JSON.stringify(projectData));
        });
    }
});