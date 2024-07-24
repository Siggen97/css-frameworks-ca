import { fetchWithToken } from "./token.mjs";
import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { formatDateString } from "./dateFormat.mjs";
import { createCardElement } from "./postCards.mjs";

let posts = [];

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

document.getElementById("searchButton").addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value.trim();
  filterPosts(searchInput);
});

const initialize = async () => {
  try {
    posts = await fetchWithToken(`${apiBaseUrl}${allPostsApi}?_author=true`);
    renderPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

initialize();
