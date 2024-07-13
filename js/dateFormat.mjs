/**
 * Formats a timestamp into a human-readable date string.
 * @param {string} timestamp - The timestamp to be formatted.
 * @returns {string} - The formatted date string.
 * @example
 * const timestamp = "2023-04-15T12:30:00Z";
 * const formattedDate = formatDateString(timestamp);
 */
export const formatDateString = (timestamp) => {
    // MONTHS IN AN ARRAY
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    // CREATE A NEW DATE OBJECT FROM THE TIMESTAMP
    const date = new Date(timestamp);
  
    // GET DATE COMPONENTS
    const day = String(date.getDate()).padStart(2, "0");
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const year = date.getFullYear();
  
    // ASSEMBLE THE STRING
    const formattedDate = `${month} ${day}, ${year}`;
  
    return formattedDate;
  };