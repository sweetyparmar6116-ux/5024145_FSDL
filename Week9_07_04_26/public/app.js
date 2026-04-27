function loadNotes() {
    fetch("/notes")
    .then(res => res.json())
    .then(data => {
        let output = "";
        data.forEach(note => {
            output += `
                <div class="note">
                    <h4>${note.title}</h4>
                    <p>${note.content}</p>
                    <button onclick="deleteNote('${note._id}')">Delete</button>
                </div>
            `;
        });
        document.getElementById("notes").innerHTML = output;
    });
}

function addNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
    })
    .then(() => {
        loadNotes();
    });
}

function deleteNote(id) {
    fetch(`/delete/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        loadNotes();
    });
}

window.onload = loadNotes;