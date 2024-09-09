// Initialize an empty object to store posts
var Posts = {};

// Extract the session cookie value
const Name = document.cookie.match("SessionCookie")["input"].split(";")[1].split("=")[1];

$(function() {
    // Load local data and navigation bar
    GetLocalData();
    $("#nav_bar").load("nav.html");

    // Handle form submission to add a new post
    document.getElementById("form_add_post").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        let formData = new FormData(event.target);
        let Fdata = {};
        for (const [key, value] of formData.entries()) {
            Fdata[key] = value; // Convert form data to a plain object
        }
        
        AddPost(Name, Fdata); // Add the post and save to local storage
    });
});

// Function to display all posts
const DisplayPosts = () => {
    const btm = document.getElementById("bottom");
    btm.innerHTML = ""; // Clear existing content
    for (const entry of Object.keys(Posts)) {
        for (const [key, val] of Object.entries(Posts[entry])) {
            console.log(key, val);
            let div = document.createElement("div");
            div.className = "post";
            div.innerHTML = `<div>
                                <h1>${val["title"]}</h1>
                                <p>${val["description"]}</p>
                             </div>
                             <i onclick="DeletePost('${entry}', ${key})" class="bi bi-x">delete</i>`;
            btm.append(div);
        }
    }
};

// Function to display posts by the current user
const DisplayPostsByUser = () => {
    const btm = document.getElementById("bottom");
    btm.innerHTML = ""; // Clear existing content
    let entry = Name;
    for (const [key, val] of Object.entries(Posts[entry])) {
        console.log(key, val);
        let div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `<div class="post-div">
                            <h1>${val["title"]}</h1>
                            <p>${val["description"]}</p>
                         </div>
                         <i onclick="DeletePost('${entry}', ${key})" class="bi bi-x"></i>`;
        btm.append(div);
    }
};

// Function to get local data from local storage
function GetLocalData() {
    let StringPost = localStorage.getItem('Posts');
    if (StringPost) {
        Posts = JSON.parse(StringPost); // Parse and load posts from local storage
        console.log(Posts);
    }
    DisplayPostsByUser(); // Display posts for the current user
}

// Function to save posts to local storage and update display
function SaveToLocalStorage() {
    localStorage.setItem('Posts', JSON.stringify(Posts)); // Save posts to local storage
    DisplayPostsByUser(); // Update the display for the current user
    console.log(Posts);
}

// Function to add a new post
const AddPost = (Name, post) => {
    if (!Posts[Name]) {
        Posts[Name] = []; // Initialize the user's post array if it doesn't exist
    }
    Posts[Name].push(post); // Add the new post
    SaveToLocalStorage(); // Save and display updated posts
};

// Function to delete a post
function DeletePost(Name, id) {
    if (Posts[Name]) {
        console.log(Posts[Name][id]);
        Posts[Name].splice(id, 1); // Remove the post at the specified index
    }
    SaveToLocalStorage(); // Save and display updated posts
}
