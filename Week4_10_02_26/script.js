const form = document.getElementById("registrationForm");
const participantList = document.getElementById("participantList");

// ES6: Arrow function + destructuring
const createParticipantCard = ({ name, email, age, event }) => `
  <div class="participant-card">
    <h3>${name}</h3>
    <p>Email: ${email}</p>
    <p>Age: ${age}</p>
    <p>Event: ${event}</p>
  </div>
`;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // ES6: const & destructuring
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const event = document.getElementById("event").value;

  if (!event) {
    alert("Please select an event");
    return;
  }

  const participant = { name, email, age, event };

  // ES6: Template literals + innerHTML
  participantList.innerHTML += createParticipantCard(participant);

  form.reset();
});


