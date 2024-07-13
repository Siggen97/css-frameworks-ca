import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { displayAllPostsCards } from "./fetchAllPosts.mjs";

// AFTER DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", () => {
// GET ELEMENTS FROM FORM
  const createPostForm = document.querySelector("#newPost");
  // SUBMIT EVENT LISTENER
  createPostForm.addEventListener("submit", createPost);
});

/**
 * Handles the form submission to create a new post.
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves when the post creation is complete.
 */

const createPost = async (event) => {
  // PREVENT DEFAULT FORM SUBMISSION
  event.preventDefault();

  // GET USER-TOKEN
  const userToken = localStorage.getItem("accessToken");

  // GET VALUES FROM FORM
  const title = event.target.querySelector("#exampleInputTitle1").value;
  const content = event.target.querySelector("#exampleInputTextArea1").value;
  const imageUrl = event.target.querySelector("#exampleInputImageUrl").value;

  // CHECK REQUIRED FIELDS
  if (!title || !content) {
    // ALERT FOR REQUIRED FIELDS
    alert("Please fill in all required fields");
    return;
  }

  // NEW POST OBJECT
  const newPost = {
    title: title,
    body: content,
    media: imageUrl,
  };

  try {
    // POST REQUEST TO CREATE NEW POST
    const response = await fetch(`${apiBaseUrl}${allPostsApi}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      // THROW ERROR IF RESPONSE NOT OK
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // RESET FORM
    event.target.reset();

    // RELOAD ALL POSTS
    await displayAllPostsCards();
  } catch (error) {
    // THROW ERROR
    throw new Error("Error creating post:", error);
  }
};