let { notesValidationSchemes } = require("../mock/scheme");
let NotesController = require("../repository/NotesController");

class NotesService {
  constructor() {
    this.controller = new NotesController();

    this.tryGetAll = () => this.controller.getAllNotes();
    this.tryGetSummary = () => this.controller.getSummary();
  }

  tryGetById(payload) {
    const schema = notesValidationSchemes.gettingSchema;
    console.log("Is valid? ", payload);
    let isValid = schema.isValidSync(payload);
    if (isValid) {
      return this.controller.getNoteById(payload.id);
    }
    return { status: 400, msg: "Payload is not valid" };
  }

  tryCreate(payload) {
    const schema = notesValidationSchemes.creatingSchema;
    if (schema.isValidSync(payload)) {
      schema.cast(payload);
      return this.controller.createNote(payload);
    }
    return { status: 400, msg: "Payload is not valid" };
  }

  tryUpdate(payload) {
    const schema = notesValidationSchemes.editingSchema;
    if (schema.isValidSync(payload)) {
      return this.controller.editNoteById(payload.id, payload);
    }
    return { status: 400, msg: "Payload is not valid" };
  }

  tryDelete(payload) {
    const schema = notesValidationSchemes.deletingSchema;
    if (schema.isValidSync(payload)) {
      return this.controller.deleteNoteById(payload.id);
    }
    return { status: 400, msg: "Payload is not valid" };
  }
}

module.exports = NotesService;
