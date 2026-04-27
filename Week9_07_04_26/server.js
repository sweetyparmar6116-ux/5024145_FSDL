const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notesdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define Note schema
const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model('Note', noteSchema);

// Middleware
app.use(express.json());
app.use(express.static('public'));

app.post("/add", async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.send("Note Added");
    } catch (err) {
        res.status(500).send("Could not add note");
    }
});

app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).send("Could not load notes");
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.send("Deleted");
    } catch (err) {
        res.status(500).send("Could not delete note");
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});