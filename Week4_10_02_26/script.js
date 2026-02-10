const form = document.getElementById("registrationForm");
const participantList = document.getElementById("participantList");
const searchInput = document.getElementById("searchInput");

// Load saved data (ES6: default parameter)
let participants = JSON.parse(localStorage.getItem("participants")) || [];

// Render participants
const renderParticipants = (data = participants) => {
  participantList.innerHTML = data.map(({ name, email, age, event }, index) => `
    <div class="participant-card">
      <h3>${name}</h3>
      <p>Email: ${email}</p>
      <p>Age: ${age}</p>
      <p>Event: ${event}</p>
      <button class="delete-btn" onclick="deleteParticipant(${index})">Delete</button>
    </div>
  `).join("");
};

// Delete function
const deleteParticipant = (index) => {
  participants.splice(index, 1);
  localStorage.setItem("participants", JSON.stringify(participants));
  renderParticipants();
};

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value;
  const event = document.getElementById("event").value;

  if (!name || !email || !event) {
    alert("All fields are required!");
    return;
  }

  const participant = { name, email, age, event };

  participants.push(participant);
  localStorage.setItem("participants", JSON.stringify(participants));

  renderParticipants();
  form.reset();
});

// Search feature
searchInput.addEventListener("input", ({ target }) => {
  const value = target.value.toLowerCase();

  const filtered = participants.filter(({ name, event }) =>
    name.toLowerCase().includes(value) ||
    event.toLowerCase().includes(value)
  );

  renderParticipants(filtered);
});

// Initial render
renderParticipants();



