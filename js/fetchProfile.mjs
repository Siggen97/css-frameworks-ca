import { apiBaseUrl, profileUrl } from "./variables.mjs";
import { fetchWithToken } from "./token.mjs";

// GET USER INFORMATION FROM LOCALSTORAGE
const user = JSON.parse(localStorage.getItem("userProfile"));

/**
 * FETCHES USER-DATA WITH AN ACCESS-TOKEN
 * @returns {Promise<UserProfile>} - A PROMISE RESOLVES USER-DATA
 */
const fetchUserProfile = async () => {
  return await fetchWithToken(`${apiBaseUrl}${profileUrl}${user.name}?_posts=true`);
};

// DOM ELEMENTS FOR USER INFORMATION
const userAvatarContainer = document.querySelector("#userAvatar");
const userNameContainer = document.querySelector("#userName");

/**
 * Displays the user's name and avatar.
 *
 * @throws {Error} 
 */
const displayUserName = async () => {
  try {
    // FETCH USER-DATA
    const json = await fetchUserProfile();
    // DISPLAY USER-NAME
    userNameContainer.innerText = json.name;
    // SET USER-IMG
    userAvatarContainer.src = !!json.avatar ? json.avatar : "../images/no_avatar.jpg";
  } catch (error) {
    // THROW ERROR
    throw new Error(error);
  }
};
// Initial call to display the single post card
displayUserName();