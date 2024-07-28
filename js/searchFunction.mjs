import { fetchWithToken } from "./token.mjs";
import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { formatDateString } from "./dateFormat.mjs";
import { createCardElement } from "./postCards.mjs";

let posts = [];
const API_URL = `${apiBaseUrl}${allPostsApi}?_author=true`;

/**
 * Renders all the posts in the selected container.
 *
 * @param {Object[]} posts An array of post objects to be rendered.
 * @example
 * Assume filteredPosts is an array of post objects obtained through some filtering mechanism.
 * renderPosts(filteredPosts);
 */
const renderPosts = (posts) => {
  const postsContainer = document.querySelector(".all-posts_card-container");
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.className = "d-flex justify-content-center bold";
    noResultsMessage.innerText = "No posts found.";
    postsContainer.appendChild(noResultsMessage);
  } else {
    createCardElement(posts);
  }
};

/**
 * Filters posts based on the provided search text and renders the filtered posts.
 *
 * @param {string} inputText The search text to filter posts.
 * @example
 * filterPosts(searchTerm);
 */
const filterPosts = (inputText) => {
  const filteredPosts = posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(inputText.toLowerCase());
    const contentMatch = post.body?.toLowerCase().includes(inputText.toLowerCase());
    const userMatch = post.author.name.toLowerCase().includes(inputText.toLowerCase());
    return titleMatch || contentMatch || userMatch;
  });
  renderPosts(filteredPosts);
};

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Extracts and trims the search term from the input field.
  const searchInput = document.getElementById("search-Input");
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    // If search term is empty, render all posts
    return renderPosts(posts);
  }

  // Call the filterPosts function with the search term
  filterPosts(searchTerm);
});

/**
 * Initializes the app by fetching posts and rendering them.
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */
const initialize = async () => {
  try {
    // Fetch posts from the API
    posts = await fetchWithToken(API_URL);
    // Render the fetched posts
    renderPosts(posts);
  } catch (error) {
    throw new Error("Error fetching posts:", error);
  }
};

// Call the initialize function to start the app
initialize();