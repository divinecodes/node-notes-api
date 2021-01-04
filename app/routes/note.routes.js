module.exports = (app) => {
    const notes = require('../controllers/note.controller');

    //create new post 
    app.post('/notes', notes.create); 

    //retrieve all notes 
    app.get('/notes',notes.findAll);

    //retrieve single notes
    app.get('/notes/:noteId', notes.findOne); 

    //update note 
    app.put('/notes/:noteId',notes.update); 

    //delete notes 
    app.delete('/notes/:noteId', notes.delete);
}