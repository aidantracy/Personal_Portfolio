// Load and display all projects
function loadProjects() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        console.log("Raw Response:", xhr.responseText); 

        if (!xhr.responseText) {
            console.error("No response received from the server.");
            return;
        }

        try {
            const projects = JSON.parse(xhr.responseText); 
            const projectsContainer = document.getElementById("projects-container");

            if (!projectsContainer) {
                console.error("Element with ID 'projects-container' not found.");
                return;
            }

            // Clear existing projects
            projectsContainer.innerHTML = "";

            projects.forEach((project) => {
                const projectCard = createProjectCard(project);
                projectsContainer.appendChild(projectCard);
            });
        } catch (error) {
            console.error("Error parsing response:", error);
        }
    });

    xhr.open("GET", "https://q8f4zchkua.execute-api.us-east-2.amazonaws.com/projects");
    xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
    // Trigger an initial load of projects
    loadProjects();

    // Add a new project
    const addProjectForm = document.getElementById("add-project-form");
    if (addProjectForm) {
        addProjectForm.onsubmit = function (event) {
            event.preventDefault();

            const projectTitle = document.getElementById("project-title").value.trim();
            const projectDescription = document.getElementById("project-description").value.trim();
            const projectUrl = document.getElementById("project-link").value.trim();

            if (!projectTitle || !projectDescription || !projectUrl) {
                alert("All fields are required!");
                return;
            }

            let xhr = new XMLHttpRequest();
            xhr.open("PUT", "https://q8f4zchkua.execute-api.us-east-2.amazonaws.com/projects");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.addEventListener("load", function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    alert("Project added");
                    addProjectForm.reset(); // Clear form
                    loadProjects(); // Reload projects
                } else {
                    console.error("Error adding project:", xhr.responseText);
                }
            });

            xhr.send(
                JSON.stringify({
                    id: projectTitle, // Assuming title is used as an ID in DynamoDB
                    project_description: projectDescription,
                    project_url: projectUrl,
                })
            );
        };
    } else {
        console.error("Element with ID 'add-project-form' not found.");
    }
});

// Create a project card dynamically
function createProjectCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");

    const title = document.createElement("h3");
    title.textContent = project.id || "No Title";

    const description = document.createElement("p");
    description.textContent = project.project_description || "No Description";

    const link = document.createElement("a");
    link.href = project.project_url || "#";
    link.textContent = "View Project";
    link.target = "_blank";

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteBTN");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        deleteProject(project.id);
    };

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(link);
    card.appendChild(deleteButton);

    return card;
}

// Delete a project
function deleteProject(projectId) {
    if (!projectId) {
        console.error("No project ID provided for deletion.");
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://q8f4zchkua.execute-api.us-east-2.amazonaws.com/projects/${projectId}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            alert("Project deleted");
            loadProjects(); // Reload projects
        } else {
            console.error("Error deleting project:", xhr.responseText);
        }
    });
    xhr.send();
}
