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
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    const json = await response.json();

    if (response.ok) {
      alert("You are now registered, please log in with your email and password!");
      window.location.reload();
      return json;
    } else {
      alert(json.message || "Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    alert("An error occurred. Please try again.");
  }
};

/**
 * Function to handle the form submission event and register a new user.
 * @param {Event} event The form submission event
 * @example
 * registerForm.addEventListener("submit", register);
 */

// REGISTER-FORM
const registerForm = document.querySelector("#registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("inputName");
    const email = document.getElementById("inputEmailRegister");
    const password = document.getElementById("inputPasswordRegister");
    const avatar = document.getElementById("inputAvatar");

    const user = {
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
    };

    registerUser(`${apiBaseUrl}${registerUrl}`, user);

    name.value = "";
    email.value = "";
    password.value = "";
    avatar.value = "";
  });
}

export { registerUser };
