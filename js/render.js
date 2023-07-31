import { getNotes, getArchivedNotes } from "./data.js";
import categoriesName from "./notes-categories.js";
import tableHeadNames from "./table-head-names.js";

// move to helpers

function formatDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// move to helpers

function formatParsedDate(content) {
  const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  const dates = content.match(dateRegex) || [];
  // todo: content.match(dateRegex) console log
  return dates.join(", ");
}

// todo: consider moving to a different location
const tableHead = `
    <tr>
      <th>Name</th>
      <th>Created</th>
      <th>Category</th>
      <th>Content</th>
      <th>Dates</th>
      <th>Actions</th>
    </tr>
  `;

function createNotesTable(notes) {
  const table = document.createElement("table");
  table.innerHTML = tableHead;

  notes.forEach((note) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${note.name}</td>
      <td>${formatDate(note.time)}</td>
      <td>${note.category}</td>
      <td>${note.content}</td>
      <td>${formatParsedDate(note.content)}</td>
      <td>
        <button data-note-id="${note.id}" class="archive-btn">Archive</button>
        <button data-note-id="${note.id}" class="edit-btn">Edit</button>
        <button data-note-id="${note.id}" class="delete-btn">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });

  return table;
}

// move to helpers
function createSummary(activeNotes, archivedNotes) {
  const summary = {};

  activeNotes.forEach((note) => {
    const category = note.category;
    if (summary[category]) {
      summary[category].activeCount += 1;
    } else {
      summary[category] = { activeCount: 1, archivedCount: 0 };
    }
  });

  archivedNotes.forEach((note) => {
    const category = note.category;
    if (summary[category]) {
      summary[category].archivedCount += 1;
    } else {
      summary[category] = { activeCount: 0, archivedCount: 1 };
    }
  });

  return summary;
}

function createSummaryTable(activeNotes, archivedNotes) {
  const summary = createSummary(activeNotes, archivedNotes);

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Note Category</th>
      <th>Active</th>
      <th>Archived</th>
    </tr>
  `;

  Object.entries(summary).forEach(([category, counts]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${category}</td>
      <td>${counts.activeCount}</td>
      <td>${counts.archivedCount}</td>
    `;
    table.appendChild(row);
  });

  return table;
}

function createArchivedNotesTable(archivedNotes) {
  const table = document.createElement("table");
  table.innerHTML = tableHead;

  archivedNotes.forEach((note) => {
    const row = document.createElement("tr");
    // todo: move to a separated function with isArchive in parameters FillTable(isArchive).
    // If isArchive - true, use Unarchive button. Otherwise, use Delete, Edit, Archive buttons
    row.innerHTML = `
      <td>${note.name}</td>
      <td>${formatDate(note.time)}</td>
      <td>${note.category}</td>
      <td>${note.content}</td>
      <td>${formatParsedDate(note.content)}</td>
      <td>
        <button data-note-id="${
          note.id
        }" class="unarchive-btn">Unarchive</button>
        <button data-note-id="${
          note.id
        }" class="delete-btn archived-note">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });

  return table;
}

export function getNotesFormatted() {
  const notes = getNotes();
  const notesTable = createNotesTable(notes);
  return notesTable;
}

export function getSummaryFormatted() {
  const activeNotes = getNotes();
  const archivedNotes = getArchivedNotes();
  const summaryTable = createSummaryTable(activeNotes, archivedNotes);
  return summaryTable;
}

export function getArchivedNotesFormatted() {
  const archivedNotes = getArchivedNotes();
  // TODO: add condition if (size == 0) return ""
  const archivedNotesTable = createArchivedNotesTable(archivedNotes);
  return archivedNotesTable;
}
