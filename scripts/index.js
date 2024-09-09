// Initialize an empty object to store posts
Posts = {};

$(function() {
    // Load the navigation bar from an external file
    $("#nav_bar").load("nav.html");
    
    let user;
    let id;

    // Retrieve local data and display posts
    GetLocalData();

    // Process each post element on the page
    $(".post").each(function() {
        id = $(this).find("h6").text(); // Extract post ID
        let desc = $(this).find(".desc");
        let Name = $(this).find(".author").text();
        user = Name.substr(4); // Extract username
        
        let txt = desc.text();
        if (txt.length > 40) {
            // Truncate the description if it's too long and add a "Read more" link
            txt = txt.substr(0, 40) + "...";
            desc.text(txt).parent().append(`<a style='font-size:0.9rem' onclick="ReadMore('${user}', ${id})" href='#'>Read more!</a>`);
        }
    });

    // Toggle visibility of the page element when the close button is clicked
    $("#close").click(function() {
        $("#page").toggle();
        console.log("clicked!");
    });
});

// Function to handle "Read more" clicks
const ReadMore = (Name, id) => {
    $("#page").toggle();
    const pgpst = document.getElementById("pgpst");
    id = parseInt(id, 10);
    const pst = Posts[Name][id];

    if (pgpst) {
        // Update the title and description on the detailed view
        const titleElement = pgpst.querySelector('h1');
        if (titleElement) {
            titleElement.textContent = pst["title"];
        }

        const descriptionElement = pgpst.querySelector('p');
        if (descriptionElement) {
            descriptionElement.innerHTML = pst["description"]; // Use innerHTML to preserve styles
        }
    } else {
        console.error('Element with id "pgpst" not found.');
    }
};

// Function to display all posts
const DisplayPosts = () => {
    const btm = document.getElementById("bottom");
    btm.innerHTML = ""; // Clear existing content

    for (const entry of Object.keys(Posts)) {
        for (const [key, val] of Object.entries(Posts[entry])) {
            console.log(key, val);
            let div = document.createElement("div");
            div.className = "post";
            div.innerHTML = `<div style="width:100%">
                               <h6>${key}</h6>
                               <h1>${val["title"]}</h1>
                               <hr>
                               <br><br>
                               <p class="author" style="font-size: 0.7rem; color: gray">by: ${entry}</p>
                               <p class="desc">${val["description"]}</p>
                           </div>`;
            btm.append(div);
        }
    }
};

// Function to retrieve posts from local storage and display them
function GetLocalData() {
    let StringPost = localStorage.getItem('Posts');
    if (StringPost) {
        Posts = JSON.parse(StringPost); // Parse and load posts from local storage
        console.log(Posts);
    }
    DisplayPosts(); // Display posts on the page
}
