// VARIABLES (ES6)
const form = document.getElementById("collegeForm");
const message = document.getElementById("message");

// CLASS
class Student {
    constructor(name, email, age, course) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.course = course;
    }

    getInfo() {
        return `Registration successful! Welcome ${this.name}.`;
    }
}

// EVENT + ARROW FUNCTION
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // VARIABLES
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value;

    // CONDITIONS
    if (!name || !email || !age || !course) {
        showMessage("Please fill all fields", "red");
        return;
    }

    if (age < 17) {
        showMessage("Age must be 17 or above", "red");
        return;
    }

    // OBJECT CREATION
    const student = new Student(name, email, age, course);

    showMessage(student.getInfo(), "green");
    clearForm();
});

// FUNCTION
const showMessage = (text, color) => {
    message.style.color = color;
    message.innerText = text;
};

// LOOP
const clearForm = () => {
    const fields = document.querySelectorAll("input, select");
    for (let i = 0; i < fields.length; i++) {
        fields[i].value = "";
    }
};

