$(function() {
    // Hide the mobile navigation menu initially
    $("#mob_nav").hide();

    // Toggle the visibility of the mobile navigation menu on Menu click
    $("#Menu").click(function() {
        $("#mob_nav").toggle();
        console.log("clicked!");
    });

    // Function to check screen size and hide mobile navigation if width is greater than 786px
    function checkScreenSize() {
        if ($(window).width() > 786) {
            $("#mob_nav").hide();
        }
    }

    // Add click event listener to the Menu element to rotate it when clicked
    document.querySelector('.Menu').addEventListener('click', function() {
        this.classList.toggle('rotated');
    });

    // Check for a specific cookie to control visibility of certain elements
    let cookieString = document.cookie;
    const match = cookieString.match("SessionCookie");
    const post = document.getElementById("post");
    const lgout = document.querySelectorAll(".logoutbtn");
    const lgin = document.querySelectorAll(".loginbtn");
    const post_list = document.querySelectorAll(".post_list");

    if (!match) {
        // If cookie is not present, hide post list and logout buttons
        post_list.forEach((element) => {
            element.style.display = "none";
        });
        lgout.forEach((element) => {
            element.style.display = "none";
        });
    } else {
        // If cookie is present, hide login buttons
        lgin.forEach((element) => {
            element.style.display = "none";
        });
    }

    // Attach resize event to check screen size when the window is resized
    $(window).resize(checkScreenSize);
    // Initial check for screen size
    checkScreenSize();
});

// Function to redirect to login page and hide mobile navigation
function Go_to_login() {
    window.location.href = "login.html";
    console.log("login Clicked!");
    $("#mob_nav").hide();
}

// Function to log out by clearing the session cookie and redirecting to login page
function logout() {
    document.cookie = "SessionCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "login.html";
}
