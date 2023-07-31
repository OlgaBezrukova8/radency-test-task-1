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
import categoriesName from "./data/notes-categories.js";

const $refs = {
  container: document.querySelector("#root"),
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
    if (!name) {
      alert("Wrong input format");
      return;
    }

    const content = prompt("Enter the note content:");
    if (!content) {
      alert("Wrong input format");
      return;
    }

    const category = prompt(
      "Enter the note category (Task, Random Thought, Idea):"
    );
    if (!category) {
      alert("Wrong input format");
      return;
    } else if (!categoriesName.includes(category)) {
      alert("Category is not exist");
      return;
    }

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
    alert(`Exception occurred. ${error.message}`);
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
  if (!updatedName) {
    alert("Wrong input format");
    return;
  }

  const updatedContent = prompt("Edit the note content:");
  if (!updatedContent) {
    alert("Wrong input format");
    return;
  }

  const updatedCategory = prompt(
    "Edit the note category (Task, Random Thought, Idea):"
  );
  if (!updatedCategory) {
    alert("Wrong input format");
    return;
  } else if (!categoriesName.includes(updatedCategory)) {
    alert("Category is not exist");
    return;
  }

  editNote(noteId, updatedName, updatedContent, updatedCategory);
  render();
}

document.addEventListener("click", (event) => {
  try {
    if (event.target.classList.contains("archive-btn")) {
      onArchiveNote(event);
    } else if (event.target.classList.contains("unarchive-btn")) {
      onUnarchiveNote(event);
    } else if (event.target.classList.contains("delete-btn")) {
      onDeleteNote(event);
    } else if (event.target.classList.contains("edit-btn")) {
      onEditNote(event);
    }
  } catch (error) {
    alert(`Exception occurred. ${error.message}`);
  }
});
