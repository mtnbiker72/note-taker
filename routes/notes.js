const notes = require('express').Router();
const { readAndAppend, readFromFile, deleteFromFile, getUUID} = require('../helpers/fsUtils');

// GET Route for retrieving all existing notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for submitting a note
notes.post('/', (req, res) => {
  console.log(req.body);
  
  const { title, text } = req.body;

  // If all the required properties are present
  // Adding getUUID so we can delete a specfic note
  if (req.body) {
    const newNote = {
      id: getUUID(),
      title,
      text,
    };

    console.log(newNote);

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting new note');
  }
});

// DELETE Route for submitting a note
notes.delete('/:id', (req, res) => {
    console.log(req.params);

    deleteFromFile('./db/db.json', req.params.id);

    const response = {
      status: 'success',
    };

    res.json(response);
});

module.exports = notes;
