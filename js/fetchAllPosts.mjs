import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken } from "./token.mjs";
import { createMessage } from "./error.mjs";
import { createCardElement } from "./postCards.mjs";

let currentPage = 1;
const postsPerPage = 15;

/**
 * Fetches posts with an access token and pagination
 * @returns {Promise} A promise representing the asynchronous operation of fetching posts.
 */
const fetchPosts = async (page, limit) => {
  const url = `${apiBaseUrl}${allPostsApi}?_author=true`;
  return await fetchWithToken(url);
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

    const posts = await fetchPosts(currentPage, postsPerPage);

    if (posts.length === 0 && currentPage === 1) {
      allPostsContainer.innerHTML = "<p>No posts found.</p>";
    } else {
      createCardElement(posts);
      if (posts.length === postsPerPage) {
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

document.addEventListener("DOMContentLoaded", () => {
  displayAllPostsCards();

  const loadMoreButton = document.getElementById("loadMoreButton");
  loadMoreButton.addEventListener("click", () => {
    displayAllPostsCards();
  });

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", async () => {
    const searchInput = document.getElementById("search-Input").value;
    const allPostsContainer = document.querySelector(".all-posts_card-container");

    if (searchInput.trim() === "") {
      displayAllPostsCards(true);
    } else {
      const url = `${apiBaseUrl}${allPostsApi}?_author=true&_sort=created&_order=desc&q=${searchInput}`;
      const posts = await fetchWithToken(url);
      allPostsContainer.innerHTML = "";
      createCardElement(posts);
    }
  });
});