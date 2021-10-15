class NotesController {
  constructor(db) {
    if (!db) {
      const { DBEmulator } = require("../mock/db");
      db = DBEmulator.getInstance();
    }
    this.db = db;
  }

  getAllNotes() {
    return this.db.getAllNotes();
  }

  getNoteById(id) {
    return this.db.getNoteById(id);
  }

  getSummary() {
    return this.db.getSummary();
  }

  deleteNoteById(id) {
    return this.db.deleteNoteById(id);
  }

  editNoteById(id, payload) {
    return this.db.editNoteById(id, payload);
  }

  createNote(payload) {
    return this.db.createNote(payload);
  }
}

module.exports = NotesController;
