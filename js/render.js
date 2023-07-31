import { getNotes, getArchivedNotes } from "./data.js";
import createSummary from "./helpers/createSummary.js";
import fillTable from "./helpers/fillTable.js";

function createNotesTable(notes) {
  return fillTable(false, notes);
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
  return fillTable(true, archivedNotes);
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
  const archivedNotesTable = createArchivedNotesTable(archivedNotes);
  return archivedNotesTable;
}
