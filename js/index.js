import {
  getNotesFormatted,
  getSummaryFormatted,
  getArchivedNotesFormatted,
} from "./render.js";
import {
  addNote,
  archiveNote,
  unarchiveNote,
  initData,
  deleteArchivedNote,
  deleteNote,
  editNote,
} from "./data.js";
import categoriesName from "./notes-categories.js";

const $refs = {
  container: document.getElementById("root"),
};

document.addEventListener("DOMContentLoaded", () => {
  initData();
  render();
});

function render() {
  $refs.container.innerHTML = "";
  $refs.container.appendChild(getNotesFormatted());
  $refs.container.appendChild(getSummaryFormatted());
  $refs.container.appendChild(getArchivedNotesFormatted());

  const addNoteBtn = document.createElement("button");
  addNoteBtn.textContent = "Add Note";
  addNoteBtn.addEventListener("click", onAddNote);
  $refs.container.appendChild(addNoteBtn);
}

function onAddNote() {
  try {
    const name = prompt("Enter the note name:");
    const content = prompt("Enter the note content:");
    const category = prompt(
      "Enter the note category (Task, Random Thought, Idea):"
    );
    if (!content || !category) return;

    const time = new Date();
    const newNote = {
      id: time.getTime(),
      name,
      time,
      content,
      category,
    };

    addNote(newNote);
  } catch (error) {
    //   document.getElementById("root").innerHTML = err.message;
    // adddlert("Wrong prompt");
  }
  render();
}

function onArchiveNote(event) {
  const noteId = parseInt(event.target.dataset.noteId);
  archiveNote(noteId);
  render();
}

function onUnarchiveNote(event) {
  const noteId = parseInt(event.target.dataset.noteId);
  unarchiveNote(noteId);
  render();
}

function onDeleteNote(event) {
  const noteId = parseInt(event.target.dataset.noteId);
  const isArchived = event.target.classList.contains("archived-note");

  if (isArchived) {
    deleteArchivedNote(noteId);
  } else {
    deleteNote(noteId);
  }

  render();
}

function onEditNote(event) {
  const noteId = parseInt(event.target.dataset.noteId);

  const updatedName = prompt("Edit the note name:");
  const updatedContent = prompt("Edit the note content:");
  const updatedCategory = prompt(
    "Edit the note category (Task, Random Thought, Idea):"
  );

  //   if (!categoriesName.find(updatedContent)) {
  //     return;
  //   }
  editNote(noteId, updatedName, updatedContent, updatedCategory);
  // todo: add try catch, add check if bode is empry, add check if category is unsupported,
  // etc.

  render();
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("archive-btn")) {
    onArchiveNote(event);
  } else if (event.target.classList.contains("unarchive-btn")) {
    onUnarchiveNote(event);
  } else if (event.target.classList.contains("delete-btn")) {
    onDeleteNote(event);
  } else if (event.target.classList.contains("edit-btn")) {
    onEditNote(event);
  }
});
