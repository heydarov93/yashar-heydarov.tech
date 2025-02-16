function sanitizeInput(input) {
  // create temporary element
  const tempEl = document.createElement('div');

  // this will automatically escape html chars
  tempEl.textContent = input;

  // return sanitized text
  return tempEl.innerHTML;
}

export { sanitizeInput };
