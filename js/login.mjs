import { apiBaseUrl, loginUrl } from "./variables.mjs";

/**
 * Function to login an existing user
 * @param {string} url The URL to which the login request will be sent.
 * @param {Object} data The user data to be included in the login request.
 * @returns {Promise<Object>} The function returns a Promise, when Promise is fulfilled, it provides the parsed JSON response recieved from the server.
 * @example
 * const loginData = { email: "example@email.com", password: "password123" };
 * loginUser("https://example.com/api/login", loginData);
 */

const loginUser = async (url, data) => {
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

    if (json.accessToken) {
      const accessToken = json.accessToken;
      localStorage.setItem("accessToken", accessToken);

      localStorage.setItem(
        "userProfile",
        JSON.stringify({ name: json.name, email: json.email, avatar: json.avatar, banner: json.banner })
      );
      alert("Login successful!");
      window.location.href = "/profile/";
      return json;
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    throw new Error(error, "An error occurred!");
  }
};

const loginForm = document.querySelector("#loginForm");
/**
 * Function to handle the form submission and initiates the logion process.
 * @param {Event} event The form submission event
 * @example
 * loginForm.addEventListener("submit", login);
 */

const login = (event) => {
  event.preventDefault();
  const [email, password] = event.target.elements;

  const user = {
    email: email.value,
    password: password.value,
  };

  loginUser(`${apiBaseUrl}${loginUrl}`, user);

  email.value = "";
  password.value = "";
};

if (loginForm) {
  loginForm.addEventListener("submit", login);
}

const checkLoginStatus = () => {
  const token = localStorage.getItem("accessToken");
  return token !== null;
};

const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userProfile");
  window.location.href = "/index.html";
};

export { checkLoginStatus, logoutUser };