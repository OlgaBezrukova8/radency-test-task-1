import notesContent from "./notes-content.js";

let notesData = []; // TODO: consider avoiding let in filling data
let archivedNotesData = []; // TODO: consider avoiding let in filling data

export function initData() {
  notesData = notesContent;
}

export function getNotes() {
  return notesData;
}

export function getArchivedNotes() {
  return archivedNotesData;
}

export function addNote(note) {
  notesData.push(note);
}

export function archiveNote(noteId) {
  moveNote(noteId, notesData, archivedNotesData);
}

export function unarchiveNote(noteId) {
  moveNote(noteId, archivedNotesData, notesData);
}

export function deleteArchivedNote(noteId) {
  archivedNotesData = archivedNotesData.filter((note) => note.id !== noteId);
  // todo: move to a sep func
}

export function deleteNote(noteId) {
  notesData = notesData.filter((note) => note.id !== noteId);
  // todo: move to a sep func
}

export function editNote(noteId, updatedName, updatedContent, updatedCategory) {
  const noteIndex = notesData.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    const editedNote = {
      ...notesData[noteIndex],
      name: updatedName,
      content: updatedContent,
      category: updatedCategory,
    };
    notesData[noteIndex] = editedNote;
  }
}

function moveNote(noteId, fromArray, toArray) {
  const noteIndex = fromArray.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    const archivedNote = fromArray.splice(noteIndex, 1)[0];
    toArray.push(archivedNote);
  }
}
