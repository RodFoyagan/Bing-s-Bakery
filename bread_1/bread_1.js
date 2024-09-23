// Select Images
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const mainImage = document.getElementById('mainImage');
        mainImage.src = this.src; // Change the main image source to the clicked thumbnail
    });
});

// Order Form

const form = document.getElementById("form");
const fullName = document.getElementById("login-name");
const phone = document.getElementById("login-phone");


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

    if (fullNameValue !== "" && isValidPhone(phoneValue)) {
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

// Check Box

const checkboxes = document.querySelectorAll('.box');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false; // Uncheck other checkboxes
                }
            });
        }
    });
});
