import { fetchWithToken } from "./token.mjs";
import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { createCardElement } from "./postCards.mjs";

let posts = [];

const sortPostsNewest = (posts) => {
  return posts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
};

const sortPostsOldest = (posts) => {
  return posts.sort((a, b) => new Date(a.updated) - new Date(b.updated));
};

document.getElementById("sortNewest").addEventListener("click", () => {
  const sortedArray = sortPostsNewest(posts);
  createCardElement(sortedArray);
});

document.getElementById("sortOldest").addEventListener("click", () => {
  const sortedArray = sortPostsOldest(posts);
  createCardElement(sortedArray);
});

const initializeSortPosts = async () => {
  try {
    posts = await fetchWithToken(`${apiBaseUrl}${allPostsApi}?_author=true`);
    createCardElement(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

initializeSortPosts();
