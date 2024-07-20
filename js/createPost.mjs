import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { displayAllPostsCards } from "./fetchAllPosts.mjs";

// AFTER DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", () => {
  const createPostForm = document.querySelector("#newPostForm");
  createPostForm.addEventListener("submit", createPost);
});

/**
 * Handles the form submission to create a new post.
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves when the post creation is complete.
 */
const createPost = async (event) => {
  event.preventDefault();

  const userToken = localStorage.getItem("accessToken");

  const title = event.target.querySelector("#postTitle").value;
  const content = event.target.querySelector("#postContent").value;
  const imageUrl = event.target.querySelector("#postImage").value;

  if (!title || !content) {
    alert("Please fill in all required fields");
    return;
  }

  const newPost = {
    title: title,
    body: content,
    media: imageUrl,
  };

  try {
    const response = await fetch(`${apiBaseUrl}${allPostsApi}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    event.target.reset();
    displayAllPostsCards(true); // Pass a parameter to indicate a refresh
  } catch (error) {
    console.error("Error creating post:", error);
    alert("An error occurred while creating the post. Please try again.");
  }
};
