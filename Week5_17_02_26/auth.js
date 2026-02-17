// ================================
// ARRAY IMPLEMENTATION
// Used to store registered users
// ================================
// Load users from localStorage so registrations persist across pages
let users = [];
try {
    users = JSON.parse(localStorage.getItem('users') || '[]');
} catch (e) {
    users = [];
}

// ================================
// REGISTRATION FUNCTION
// ================================
function registerUser(event) {
    event.preventDefault();

    try {
        let username = document.getElementById("username").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;

        // Validations
        if (!username || !email || !password) throw new Error('All fields are required!');
        if (!validateEmail(email)) throw new Error('Invalid email format!');
        let pwdCheck = checkPasswordStrength(password);
        if (!pwdCheck.valid) throw new Error(pwdCheck.message);

        // Normalize strings
        username = username.toLowerCase();
        email = email.toLowerCase();

        // Prevent duplicate usernames/emails
        if (users.some(u => u.username === username)) throw new Error('Username already taken');
        if (users.some(u => u.email === email)) throw new Error('Email already registered');

        // Date
        const registeredOn = new Date().toISOString();

        const user = {
            id: Date.now(),
            username,
            email,
            password,
            registeredOn,
            lastLogin: null
        };

        users.push(user);
        saveUsers();

        document.getElementById("msg").innerHTML =
            `Registration Successful!<br>Registered on: ${formatDate(registeredOn)}`;

    } catch (err) {
        document.getElementById("msg").innerHTML = `Error: ${err.message || err}`;
    }
}

// ================================
// LOGIN FUNCTION
// ================================
function loginUser(event) {
    event.preventDefault();

    try {
        const username = document.getElementById("loginUsername").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        if (!username || !password) throw new Error('All fields are required!');

        const found = users.find(u => u.username === username && u.password === password);
        if (!found) throw new Error('Invalid username or password!');

        found.lastLogin = new Date().toISOString();
        saveUsers();

        document.getElementById("loginMsg").innerHTML = `Login Successful! Welcome ${found.username}`;

    } catch (err) {
        document.getElementById("loginMsg").innerHTML = `Error: ${err.message || err}`;
    }
}

// ------------------------
// Utility functions
// ------------------------
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function validateEmail(email) {
    // basic RFC-like regex for demonstration
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function checkPasswordStrength(pw) {
    if (pw.length < 6) return { valid: false, message: 'Password must be at least 6 characters' };
    if (!/[0-9]/.test(pw)) return { valid: false, message: 'Password must include a number' };
    if (!/[A-Z]/.test(pw)) return { valid: false, message: 'Password should include an uppercase letter' };
    return { valid: true };
}

function formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleString();
}

// Demonstrate array/string methods: returns a comma-separated list of usernames
function listUsernames() {
    return users.map(u => u.username).join(', ');
}

// Show detailed users in the `msg` element (for debugging / demo)
function showAllUsers() {
    const el = document.getElementById('msg');
    if (!el) return;
    if (users.length === 0) {
        el.innerHTML = 'No registered users.';
        return;
    }
    const items = users.map(u => {
        return `${u.username} (${u.email}) - Registered: ${formatDate(u.registeredOn)} - LastLogin: ${u.lastLogin ? formatDate(u.lastLogin) : 'never'}`;
    });
    el.innerHTML = items.join('<br>');
}
// Show / Hide Password Feature
function togglePassword() {
    const pwd = document.getElementById("loginPassword");
    pwd.type = pwd.type === "password" ? "text" : "password";
}


function loginUser(event) {
    event.preventDefault();

    try {
        const username = document.getElementById("loginUsername").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        if (!username || !password) throw new Error('All fields are required!');

        const found = users.find(u => u.username === username && u.password === password);
        if (!found) throw new Error('Invalid username or password!');

        found.lastLogin = new Date().toISOString();
        saveUsers();

        document.getElementById("loginMsg").style.color = "green";
        document.getElementById("loginMsg").innerHTML =
            `Login Successful! Welcome ${found.username}`;

        // OPTIONAL redirect
        // window.location.href = "welcome.html";

    } catch (err) {
        document.getElementById("loginMsg").style.color = "red";
        document.getElementById("loginMsg").innerHTML =
            `Error: ${err.message || err}`;
    }
}


// Expose for console usage during development
window.auth = { users, registerUser, loginUser, listUsernames, showAllUsers };
