
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


// as an example to reference 
// // Function to Load and Display All Items
// document.getElementById("load-data").onclick = function() {
//     let xhr = new XMLHttpRequest();
//     xhr.addEventListener("load", function() {
//         const items = JSON.parse(xhr.responseText);
//         const tableBody = document.getElementById("inventory-table").querySelector("tbody");
//         tableBody.innerHTML = ""; 

//         items.forEach(item => {
//             const row = document.createElement("tr");

//             // ID
//             const id = document.createElement("td");
//             id.textContent = item.id;
//             row.appendChild(id);

//             // Name 
//             const name = document.createElement("td");
//             name.textContent = item.name;
//             row.appendChild(name);

//             // Price 
//             const price = document.createElement("td");
//             price.textContent = item.price;
//             row.appendChild(price);

//             // Constructs the row and adds it to the tbody
//             const actions = document.createElement("td");
//             const deleteButton = document.createElement("button");
//             deleteButton.setAttribute("class", "deleteBTN");
//             deleteButton.textContent = "Delete";
//             deleteButton.onclick = function() {
//                 deleteItem(item.id);
//             };
//             actions.appendChild(deleteButton);
//             row.appendChild(actions);

//             tableBody.appendChild(row);
//         });
//     });


//     xhr.open("GET", "https://r6acc1vbnl.execute-api.us-east-2.amazonaws.com/items");
//     xhr.send();
// };

// // Delete an item
// function deleteItem(itemId) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("DELETE", `https://r6acc1vbnl.execute-api.us-east-2.amazonaws.com/items/${itemId}`);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.addEventListener("load", function() {
//         alert("Item deleted");
//         document.getElementById("load-data").click(); // Reload items
//     });
//     xhr.send();
// }

// // Add a new item
// let current = 0; // current id number in the db
// document.getElementById("add-item-form").onsubmit = function(event) {
//     event.preventDefault();
    
//     current += 1;
//     const itemID = current; 
//     const itemName = document.getElementById("item-name").value;
//     const itemPrice = parseFloat(document.getElementById("item-price").value);

//     let xhr = new XMLHttpRequest();
//     xhr.open("PUT", "https://r6acc1vbnl.execute-api.us-east-2.amazonaws.com/items");
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.addEventListener("load", function() {
//         alert("Item added");
//         document.getElementById("add-item-form").reset(); // clears items 
//         document.getElementById("load-data").click();  // reloads items
//     });

//     xhr.send(JSON.stringify({
//         "id": current.toString(), 
//         "name": itemName,
//         "price": itemPrice
//     }));
// };