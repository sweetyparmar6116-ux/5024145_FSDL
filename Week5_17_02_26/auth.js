// ================================
// ARRAY IMPLEMENTATION
// Used to store registered users
// ================================
let users = [];

// ================================
// REGISTRATION FUNCTION
// ================================
function registerUser(event) {
    event.preventDefault();

    // ================================
    // ERROR HANDLING USING try-catch
    // ================================
    try {
        // Fetch input values
        let username = document.getElementById("username").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;

        // ================================
        // VALIDATIONS
        // ================================
        if (username === "" || email === "" || password === "") {
            throw "All fields are required!";
        }

        if (!email.includes("@")) {   // String validation
            throw "Invalid email format!";
        }

        if (password.length < 6) {
            throw "Password must be at least 6 characters!";
        }

        // ================================
        // STRING METHODS
        // ================================
        username = username.toLowerCase();
        email = email.toLowerCase();

        // ================================
        // DATE OBJECT
        // ================================
        let registrationDate = new Date().toLocaleString();

        // ================================
        // ARRAY USAGE (push)
        // ================================
        let user = {
            username: username,
            email: email,
            password: password,
            registeredOn: registrationDate
        };

        users.push(user);

        document.getElementById("msg").innerHTML =
            "Registration Successful!<br>Registered on: " + registrationDate;

    } catch (error) {
        document.getElementById("msg").innerHTML =
            "Error: " + error;
    }
}

// ================================
// LOGIN FUNCTION
// ================================
function loginUser(event) {
    event.preventDefault();

    // ================================
    // ERROR HANDLING
    // ================================
    try {
        let username = document.getElementById("loginUsername").value.trim().toLowerCase();
        let password = document.getElementById("loginPassword").value;

        // ================================
        // VALIDATIONS
        // ================================
        if (username === "" || password === "") {
            throw "All fields are required!";
        }

        // ================================
        // ARRAY METHOD (find)
        // ================================
        let foundUser = users.find(user =>
            user.username === username && user.password === password
        );

        if (!foundUser) {
            throw "Invalid username or password!";
        }

        document.getElementById("loginMsg").innerHTML =
            "Login Successful! Welcome " + foundUser.username;

    } catch (error) {
        document.getElementById("loginMsg").innerHTML =
            "Error: " + error;
    }
}
