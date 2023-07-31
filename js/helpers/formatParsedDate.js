function formatParsedDate(content) {
  const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  const dates = content.match(dateRegex) || [];
  return dates.join(", ");
}

export default formatParsedDate;
