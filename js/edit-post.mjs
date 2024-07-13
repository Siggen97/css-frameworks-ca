import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken, token, getData } from "./token.mjs";

// Query string parameter
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");

/**
 * Handles the form submission to edit a post.
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves when the post editing is complete.
 * @throws {Error} - Throws an error if there's an issue with the editing process.
 */
const editPost = async (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get form input values
  const title = event.target.querySelector("#editTitle");
  const content = event.target.querySelector("#editBodyText");
  const imageUrl = event.target.querySelector("#editImage");

  // Create an object with edited post data
  const editPostData = {
    title: title.value,
    body: content.value,
    media: imageUrl.value,
  };

  try {
    // Send a PUT request to update the post
    const response = await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editPostData),
    });
    // Check if the response indicates a successful update
    if (response) {
      // Display a success message to the user
      alert("Your post is updated!");

      // Redirect to the user's profile page after successful update
      window.location.href = "/profile/";
    } else {
      // Display an error message if the update was not successful
      alert("Failed to update the post. Please try again.");
    }
  } catch (error) {
    // Throw an error with a detailed message if an error occurs during the update
    throw new Error("Error updating post:", error);
  }
};

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
  const editPostForm = document.querySelector("#editPost");
  editPostForm.addEventListener("submit", editPost);
});

// DOM elements for form inputs
const editTitle = document.querySelector("#editTitle");
const editContent = document.querySelector("#editBodyText");
const editImageUrl = document.querySelector("#editImage");

/**
 * Gets the current post ID from the query string.
 * @returns {string|null} - The current post ID or null if not found.
 */
const getPostId = () => {
  const currentPostId = postId;
  return currentPostId;
};

/**
 * Fetches a single post with the given post ID.
 * @param {string|null} postId - The ID of the post to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the fetched post.
 */
const getSinglePost = async (postId) => {
  const apiUrl = `${apiBaseUrl}${allPostsApi}/${postId}`;
  const currentPost = await fetchWithToken(apiUrl, getData);
  return currentPost;
};

/**
 * Prefills the form with post data.
 * @param {Object} post - The post object containing data to prefill the form.
 */
const preFillFormWithPostData = (post) => {
  editTitle.value = post.title;
  editContent.value = post.body;
  editImageUrl.value = post.media;
};

/**
 * Main function to fetch and prefill the form with post data.
 */
const prefillFormWithPostDataAndInitialize = async () => {
  const postId = getPostId();
  const post = await getSinglePost(postId);
  preFillFormWithPostData(post);
};

// Event listener for when the DOM content has loaded
window.addEventListener("DOMContentLoaded", prefillFormWithPostDataAndInitialize);