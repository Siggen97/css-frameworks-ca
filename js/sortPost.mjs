import { fetchWithToken } from "./token.mjs";
import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { createCardElement } from "./postCards.mjs";

// ARRAY TO STORE POSTS
let posts = [];

// API URL TO FETCH POSTS
const API_URL = `${apiBaseUrl}${allPostsApi}?_author=true`;

/**
 * Sorts an array of posts in descending order based on their update timestamps.
 *
 * @param {Object[]} posts - The array of post objects to be sorted.
 * @returns {Object[]} - A new array of posts sorted in descending order by update timestamps.
 * @example
 * const sortedPosts = sortPostsNewest(postsArray);
 */

const sortPostsNewest = (posts) => {
  // SORT METHOD USING TIMESTAMP
  const sortedArray = posts.sort(function (a, b) {
    // TIMESTAMP TO DATE OBJECT
    const timeA = new Date(a.updated);
    const timeB = new Date(b.updated);

    // COMPARE TIMESTAMP
    return timeB - timeA;
  });
  // RETURN SORTED ARRAY
  return sortedArray;
};

/**
 * Sorts an array of posts in ascending order based on their update timestamps.
 *
 * @param {Object[]} posts - The array of post objects to be sorted.
 * @returns {Object[]} - A new array of posts sorted in ascending order by update timestamps.
 * @example
 * const sortedPosts = sortPostsOldest(postsArray);
 */

const sortPostsOldest = (posts) => {
  // SORT METHOD USING TIMESTAMP
  const sortedArray = posts.sort(function (a, b) {
    // TIMESTAMP TO DATE OBJECT
    const timeA = new Date(a.updated);
    const timeB = new Date(b.updated);

    // COMPARE TIMESTAMP
    return timeA - timeB;
  });
  // RETURN SORTED ARRAY
  return sortedArray;
};

// SELECT SORT BUTTONS CONTAINER
const sortButtonsContainer = document.querySelector("#sort-buttons");

// CLICK EVENT LISTENER
sortButtonsContainer.addEventListener("click", function (event) {
  // CHECK IF CLICKED BUTTON IS NEWEST OR OLDEST
  if (event.target.id === "newest") {


// USE SORTPOSTSNEWEST FUNCTION
    const sortedArray = sortPostsNewest(posts);

    // CREATE CARD ELEMENTS BASED ON SORTED ARRAY
    createCardElement(sortedArray);
  } else if (event.target.id === "oldest") {


    // USE SORTPOSTSOLDEST FUNCTION
    const sortedArray = sortPostsOldest(posts);

    // CREATE CARD ELEMENTS BASED ON SORTED ARRAY
    createCardElement(sortedArray);
  }
});

/**
 * Initializes the app by fetching posts, rendering them, and handling sorting functionality.
 */
const initializeSortPosts = async () => {
  try {
    // FETCH POSTS FROM API
    posts = await fetchWithToken(API_URL);
    // RENDER POSTS
    createCardElement(posts);
  } catch (error) {
    throw new Error("Error fetching posts:", error);
  }
};

// FUNCTION TO START APP
initializeSortPosts();