// VARIABLES
let form = document.getElementById("registerForm");
let message = document.getElementById("message");

// CLASS & OBJECT
class User {
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    displayUser() {
        return `Welcome ${this.name}, Registration Successful!`;
    }
}

// EVENT
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // VARIABLES
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let age = document.getElementById("age").value;

    // OPERATORS & CONDITIONS
    if (name === "" || email === "" || password === "" || age === "") {
        message.style.color = "red";
        message.innerText = "All fields are required!";
        return;
    }

    if (password.length < 6) {
        message.style.color = "red";
        message.innerText = "Password must be at least 6 characters!";
        return;
    }

    if (age < 18) {
        message.style.color = "red";
        message.innerText = "You must be 18 or older!";
        return;
    }

    // OBJECT CREATION
    let user = new User(name, email, age);

    // FUNCTION CALL
    showSuccess(user);
});

// FUNCTION
function showSuccess(user) {
    message.style.color = "green";
    message.innerText = user.displayUser();

    // LOOP
    let fields = document.querySelectorAll("input");
    for (let i = 0; i < fields.length; i++) {
        fields[i].value = "";
    }
}
