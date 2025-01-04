export function formatDate(dateString) {
  const userLocale = navigator.language || navigator.userLanguage;
  const options = { year: 'numeric', month: 'long' };
  const date = new Date(dateString);

  let formatter;
  if (userLocale === 'az-AZ') {
    formatter = new Intl.DateTimeFormat(userLocale, options);
  } else {
    formatter = new Intl.DateTimeFormat('en-US', options);
  }

  const parts = formatter.formatToParts(date);
  const formattedDate = parts
    .filter((part) => part.type !== 'literal')
    .map((part) => part.value)
    .join(', ');

  return formattedDate;
}
