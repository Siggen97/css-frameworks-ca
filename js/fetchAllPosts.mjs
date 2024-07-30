import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken } from "./token.mjs";
import { createMessage } from "./error.mjs";
import { createCardElement } from "./postCards.mjs";
import { searchPosts } from "./searchFunction.mjs";

let currentPage = 1;
const postsPerPage = 15;
let posts = [];

/**
 * Fetches posts with an access token and pagination
 * @returns {Promise<Array>} A promise representing the asynchronous operation of fetching posts.
 */
const fetchPosts = async (page, limit) => {
  const url = `${apiBaseUrl}${allPostsApi}?_author=true&_page=${page}&_limit=${limit}`;
  const response = await fetchWithToken(url);
  return Array.isArray(response) ? response : [];
};

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
 * Displays post cards by fetching and rendering posts.
 *
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */
export const displayAllPostsCards = async (refresh = false) => {
  const loaderContainer = document.querySelector(".loader-container");
  const allPostsContainer = document.querySelector(".all-posts_card-container");
  const loadMoreButton = document.getElementById("loadMoreButton");
  const errorMessage = createMessage("error");

  if (refresh) {
    currentPage = 1;
    allPostsContainer.innerHTML = "";
  }

  try {
    loaderContainer.style.display = "block";
    loadMoreButton.style.display = "none";

    const fetchedPosts = await fetchPosts(currentPage, postsPerPage);

    if (fetchedPosts.length === 0 && currentPage === 1) {
      allPostsContainer.innerHTML = "<p>No posts found.</p>";
    } else {
      createCardElement(fetchedPosts);
      if (fetchedPosts.length === postsPerPage) {
        loadMoreButton.style.display = "block";
      }
    }
    currentPage++;
  } catch (error) {
    allPostsContainer.innerHTML = errorMessage;
    console.error("Error fetching posts:", error);
  } finally {
    loaderContainer.style.display = "none";
  }
};

/**
 * Filters posts based on the provided search text and renders the filtered posts.
 *
 * @param {string} inputText The search text to filter posts.
 * @example
 * filterPosts(searchTerm);
 */
const filterPosts = async (inputText) => {
  const filteredPosts = await searchPosts(inputText);
  renderPosts(filteredPosts);
};

document.addEventListener("DOMContentLoaded", () => {
  displayAllPostsCards();

  const loadMoreButton = document.getElementById("loadMoreButton");
  loadMoreButton.addEventListener("click", () => {
    displayAllPostsCards();
  });

  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Extracts and trims the search term from the input field.
    const searchInput = document.getElementById("search-Input");
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
      // If search term is empty, render all posts
      displayAllPostsCards(true);
    } else {
      // Call the filterPosts function with the search term
      filterPosts(searchTerm);
    }
  });
});
