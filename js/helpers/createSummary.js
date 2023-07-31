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

export default createSummary;
