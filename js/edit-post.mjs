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
 */
const editPost = async (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get form input values
  const title = event.target.querySelector("#editTitle").value;
  const content = event.target.querySelector("#editBodyText").value;
  const imageUrl = event.target.querySelector("#editImage").value;

  // Create an object with edited post data
  const editPostData = {
    title: title,
    body: content,
    media: imageUrl,
  };

  try {
    // Send a PUT request to update the post
    await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editPostData),
    });

    // Redirect to the user's profile page after update attempt
    window.location.href = "/profile/";
  } catch (error) {
    // Redirect to the user's profile page even if there's an error
    window.location.href = "/profile/";
  }
};

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
  const editPostForm = document.querySelector("#editPostForm");
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
