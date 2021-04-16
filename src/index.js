export default function formatIsoDate(date) {
  if (!(date instanceof Date)) date = new Date(+date);
  if (isNaN(date)) return "Invalid Date";
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = date.getUTCMilliseconds();
  return `${formatIsoYear(date.getUTCFullYear(), 4)}-${pad(date.getUTCMonth() + 1, 2)}-${pad(date.getUTCDate(), 2)}${
    hours || minutes || seconds || milliseconds ? `T${pad(hours, 2)}:${pad(minutes, 2)}${
      seconds || milliseconds ? `:${pad(seconds, 2)}${
        milliseconds ? `.${pad(milliseconds, 3)}` : ``
      }` : ``
    }Z` : ``
  }`;
}

function formatIsoYear(year) {
  return year < 0 ? `-${pad(-year, 6)}`
    : year > 9999 ? `+${pad(year, 6)}`
    : pad(year, 4);
}

function pad(value, width) {
  return (value + "").padStart(width, "0");
}
