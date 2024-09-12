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

//Contact Form

const form = document.getElementById("form");
const fullName = document.getElementById("login-name");
const phone = document.getElementById("login-phone");
const myMessage = document.getElementById("login-message");


form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (checkInputs()) { // Check inputs first
    
        // Use a timeout to ensure styles are applied before showing the alert
        setTimeout(() => {
            alert("Form submitted successfully!"); // Show alert
            form.submit(); // Submit the form
        }, 0);
    }
});

function checkInputs() {
    const fullNameValue = fullName.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = myMessage.value.trim();
    let isValid = true;

    if(fullNameValue === "") {
        setErrorFor(fullName, "This field cannot be blank.");
        isValid= false;
    } else if (!isValidFullName(fullNameValue)) {
        setErrorFor(fullName, "Please provide your First and Last name.");
        isValid = false;
    } else {
        setSuccessFor(fullName);
    }
    
        if(phoneValue === "") {
            setErrorFor(phone, "This field cannot be blank.");
            isValid = false;
        } else if (!isValidPhone(phoneValue)) {
            setErrorFor(phone, "Phone number is invalid.");
            isValid = false;
        } else {
            setSuccessFor(phone);
        }
    
    if(messageValue === "") {
        setErrorFor(myMessage, "This field cannot be blank.");
        isValid = false;
    } else if (messageValue.length < 20 || messageValue.length > 100) {
        setErrorFor(myMessage, "Message must between 20 to 100 characters.");
        isValid = false;
    } else{
        setSuccessFor(myMessage);
    }
    if (fullNameValue !== "" && isValidPhone(phoneValue) && messageValue !== "" && messageValue.length >= 10) {
        isValid = true;
    }
    return isValid; // Return the validation result
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector("p.error-message");
    errorMessage.innerText = message;
    formControl.className = "form-control error";
    errorMessage.style.visibility = "visible";
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
    const errorMessage = formControl.querySelector("p.error-message");
    errorMessage.style.visibility = "hidden";
}

function isValidPhone(phone) {
    return /((^(\+)(\d){12}$)|(^\d{11}$))/.test(phone);
}

const fullNameRegex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;

function isValidFullName(fullName) {
    return fullNameRegex.test(fullName);
}

