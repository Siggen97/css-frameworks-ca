import { apiBaseUrl, registerUrl } from "./variables.mjs";

/**
 * Function to register a new user
 * @param {string} url The URL to which the registration request will be sent.
 * @param {Object} data The user data to be included in the registration request.
 * @returns {Promise<Object>} The function returns a Promise, when Promise is fulfilled, it provides the parsed JSON response received from the server.
 * @example
 * const userData = {
 *   name: "Ludvig Elster",
 *   email: "ludvig.elster@example.com",
 *   password: "Yadayda34",
 *   avatar: "https://example.com/avatar.jpg",
 * };
 * registerUser("https://example.com/api/register", userData);
 */

const registerUser = async (url, data) => {
  try {
    // CREATE OBJECT FOR FETCH REQUEST
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // USER-DATA TO JSON STRING
      body: JSON.stringify(data),
    };
    // SEND FETCH-REQUEST TO AN URL
    const response = await fetch(url, postData);
    // PARSE RESPONSE AS JSON
    const json = await response.json();

    alert("You are now registered, please log in with your email and password!");
    // REDIRECT TO LOGIN
    window.location.href = "#";

    // RETURN JSON DATA
    return json;
  } catch (error) {
    // THROW ERROR
    throw new Error(error, "Error happened");
  }
};


// REGISTER-FORM
const registerForm = document.querySelector("#registerForm");

/**
 * Function to handle the form submission event and register a new user.
 * @param {Event} event The form submission event
 * @example
 * registerForm.addEventListener("submit", register);
 */
const register = (event) => {
  // PREVENT DEFAULT FORM BEHAVIOR
  event.preventDefault();
  // DESTRUCTURE FORM ELEMENTS
  const [name, email, password, avatar] = event.target.elements;

  // CREATE USER OBJECT WITH VALUES
  const user = {
    name: name.value,
    email: email.value,
    password: password.value,
    avatar: avatar.value,
  };

  // CALL FUNCTION TO SEND USER-DATA
  registerUser(`${apiBaseUrl}${registerUrl}`, user);

  // CLEAR FORM FIELDS
  name.value = "";
  email.value = "";
  password.value = "";
  avatar.value = "";
};

// EVENT LISTENER FOR FORM SUBMISSION
registerForm.addEventListener("submit", register);