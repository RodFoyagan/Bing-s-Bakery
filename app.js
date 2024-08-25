// const menu = document.querySelector('#mobile-menu');
// const menuLinks = document.querySelector('.navbar__menu');

// menu.addEventListener('click', function() {
//     menu.classList.toggle('is-active');
//     menuLinks.classList.toggle('active');
// });

// Wait until the entire HTML document is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select the mobile menu toggle element (hamburger icon)
    const menuToggle = document.getElementById('mobile-menu');
    
    // Select the menu container element
    const menu = document.querySelector('.navbar__menu');
    
    // Select all the menu links
    const menuLinks = document.querySelectorAll('.navbar__links');


    // Add a click event listener to the menu toggle (hamburger icon)
    menuToggle.addEventListener('click', () => {
        // Toggle the 'active' class on the menu to show/hide it
        menu.classList.toggle('active');
        // Toggle the 'is-active' class on the menu toggle to change its appearance
        menuToggle.classList.toggle('is-active');
    });

    // order.addEventListener('click', () => {
    //     menu.classList.remove('active');
    //     order.classList.remove('is-active');
    // });

    // Loop through each menu link
    menuLinks.forEach(link => {
        // Add a click event listener to each menu link
        link.addEventListener('click', () => {
            // When a menu link is clicked, remove the 'active' class from the menu
            menu.classList.remove('active');
            // Also remove the 'is-active' class from the menu toggle
            menuToggle.classList.remove('is-active');
        });
    });
});



