const { createUUID } = require("../helpers/utils");
const { initialNotes } = require("./index");
const { CATEGORY } = require("./scheme");

class DBMock {
  constructor(notes) {
    this.notes = [];
    notes.forEach((element) => {
      this.createNote(element);
    });
  }

  getAllNotes() {
    return this.notes;
  }

  getNoteById(id) {
    console.log(id, this.notes);
    return this.notes.find((note) => note.id === id);
  }

  deleteNoteById(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    return id;
  }

  createNote(note) {
    note.id = createUUID(); // not as good as can be, TODO: change it when DB is on
    note.isArchived = note.isArchived || false;
    if (note.createdAt instanceof Date) {
      note.createdAt = note.createdAt || Date.now();
    } else {
      note.createdAt = new Date(note.createdAt).getTime() || Date.now();
    }

    this.notes.push(note);
    return note;
  }

  editNoteById(id, note) {
    const elem = this.notes.find((note) => note.id === id);
    elem.name = note.name || elem.name;
    elem.category = note.category || elem.category;
    elem.isArchived =
      note.isArchived === undefined ? elem.isArchived : note.isArchived;
    elem.content = note.content || elem.content;
    elem.dates = note.dates || elem.dates;
    return elem;
  }

  getSummary() {
    const summary = {};
    CATEGORY.forEach((category) => {
      const categoryStat = { active: 0, archive: 0 };
      this.notes
        .filter((note) => note.category === category)
        .reduce((prev, curr) => {
          if (curr.isArchived) {
            prev.archive += 1;
          } else {
            prev.active += 1;
          }
          return prev;
        }, categoryStat);
      summary[category] = { ...categoryStat };
    });
    return summary;
  }
}

// Singleton
const DBEmulator = (function () {
  var instance;

  function createInstance(notes) {
    notes = notes || initialNotes;
    const db = new DBMock(notes);
    return db;
  }

  return {
    getInstance: (notes) => {
      if (!instance) {
        instance = createInstance(notes);
      }
      return instance;
    },
  };
})();

module.exports = { DBEmulator };
