import formatDate from "./formatDate.js";
import formatParsedDate from "./formatParsedDate.js";

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

function fillTable(isArchive, notes) {
  const table = document.createElement("table");
  if (notes.length === 0) return table;
  table.innerHTML = tableHead;

  notes.forEach(({ id, name, time, category, content }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${formatDate(time)}</td>
      <td>${category}</td>
      <td>${content}</td>
      <td>${formatParsedDate(content)}</td>
      <td>
        ${
          isArchive
            ? `<button data-note-id="${id}" class="unarchive-btn">Unarchive</button>
        <button data-note-id="${id}" class="delete-btn archived-note">Delete</button>`
            : `<button data-note-id="${id}" class="archive-btn">Archive</button>
        <button data-note-id="${id}" class="edit-btn">Edit</button>
        <button data-note-id="${id}" class="delete-btn">Delete</button>`
        }
      </td>
    `;

    table.appendChild(row);
  });

  return table;
}

export default fillTable;
