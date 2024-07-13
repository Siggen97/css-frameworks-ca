// GET ACCESS-TOKEN FROM LOCALSTORAGE
export const token = localStorage.getItem("accessToken");

// CREATE OBJECT FOR ACCESS-TOKEN, REQUEST HEADERS
export const getData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

/**
 * Fetches data from the specified URL with an access token.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} [options=getData] - The options for the fetch request.
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON response.
 * @throws {Error} - Throws an error if an issue occurs during the fetch operation.
 * @example
 * const apiUrl = `${apiBaseUrl}${postsAPI}`;
 * try {
 *   const data = await fetchWithToken(apiUrl);
 * } catch (error) {
 *   throw new Error(message, error);
 * }
 */
export const fetchWithToken = async (url, options = getData) => {
    try {
      // FETCH RESPONSE WITCH AN URL
      const response = await fetch(url, options);
  
      // PARSE RESPONSE AS JSON
      const json = await response.json();
  
      // CATCH ERRORS
      return json;
    } catch (error) {
      // THROW ERROR
      throw new Error("An error occurred during the fetch operation", error);
    }
  };