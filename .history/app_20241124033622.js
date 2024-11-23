// Initialize EmailJS with your public key
emailjs.init("oDauPnMolACE55mNB"); // Replace with your actual public key

// Get references to the form and its elements
const form = document.getElementById("form");
const nameInput = document.getElementById("login-name");
const phoneInput = document.getElementById("login-phone");
const messageInput = document.getElementById("login-message");

// Listen for form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate inputs before proceeding
    if (!checkInputs()) {
        return; // Stop if validation fails
    }

    // Collect form values
    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const messageValue = messageInput.value.trim();

    // Create an object to hold the form data
    const contactDetails = {
        customer_name: nameValue,
        customer_phone: phoneValue,
        customer_message: messageValue,
    };

    // Send the email using EmailJS
    emailjs
        .send("service_ceb9ind", "template_i2dtafd", contactDetails)
        .then(
            function (response) {
                console.log("SUCCESS!", response.status, response.text);
                alert("Your message has been sent successfully!");

                // Reset the form fields
                form.reset();
            },
            function (error) {
                console.log("FAILED...", error);
                alert("Failed to send your message. Please try again later.");
            }
        );
});

// Function to check inputs and validate them
function checkInputs() {
    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const messageValue = messageInput.value.trim();
    let isValid = true;

    // Validate name
    if (nameValue === "") {
        setErrorFor(nameInput, "This field cannot be empty.");
        isValid = false;
    } else if (!isValidFullName(nameValue)) {
        setErrorFor(nameInput, "Please provide your First and Last name.");
        isValid = false;
    } else {
        setSuccessFor(nameInput);
    }

    // Validate phone
    if (phoneValue === "") {
        setErrorFor(phoneInput, "This field cannot be empty.");
        isValid = false;
    } else if (!isValidPhone(phoneValue)) {
        setErrorFor(phoneInput, "Invalid phone number.");
        isValid = false;
    } else {
        setSuccessFor(phoneInput);
    }

    // Validate message
    if (messageValue === "") {
        setErrorFor(messageInput, "This field cannot be empty.");
        isValid = false;
    } else if (messageValue.length < 20 || messageValue.length > 100) {
        setErrorFor(messageInput, "Message must be between 20 to 100 characters.");
        isValid = false;
    } else {
        setSuccessFor(messageInput);
    }

    return isValid; // Return true if everything is valid
}

// Function to display error messages
function setErrorFor(input, message) {
    const formControl = input.parentElement; // Get parent element of input
    const errorMessage = formControl.querySelector("p.error-message"); // Find the error message element
    errorMessage.innerText = message; // Set the error message text
    formControl.className = "form-control error"; // Add error class to input's parent
    errorMessage.style.visibility = "visible";  // Make the error message visible
}

// Function to hide error messages and style inputs as valid
function setSuccessFor(input) {
    const formControl = input.parentElement; // Get parent element of input
    formControl.className = "form-control success"; // Add success class to input's parent
    const errorMessage = formControl.querySelector("p.error-message");
    errorMessage.style.visibility = "hidden"; // Hide the error message
}

// Function to validate phone number
function isValidPhone(phone) {
    return /((^(\+)(\d){12}$)|(^\d{11}$))/.test(phone);
}

// Regex to validate full name (first and last name)
const fullNameRegex = /^([A-Za-zÀ-ÿ]{3,})+\s+([A-Za-zÀ-ÿ\s'-]{3,})+$/i;

function isValidFullName(fullName) {
    return fullNameRegex.test(fullName);
}
