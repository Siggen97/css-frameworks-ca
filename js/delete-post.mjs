import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken, token } from "./token.mjs";

/**
 * Deletes a post with the specified ID after confirmation
 *
 * @param {number} id - The ID of the post to be deleted
 * @returns {Promise<void>} - A Promise that resolves when the deletion is successful
 * @throws {Error} - Throws an error if there's an issue with the deletion process

 */
const deletePost = async (id) => {
  try {
    // Perform the deletion when confirmed
    const response = await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.error) {
      // Handle unsuccessful deletion, e.g., throw an error with the response status text
      throw new Error("Error deleting post:", response.statusText);
    } else {
      alert("Post is deleted!");
      // Redirect to the profile page after successful deletion
      window.location.href = "/profile/";
    }
  } catch (error) {
    throw new Error("Error deleting post:", error);
  }
};

const cancelDeleteButton = document.querySelector("#cancelDelete");
const confirmDeleteButton = document.querySelector("#confirmDelete");
const deleteConfirmationModal = document.querySelector("#deleteConfirmationModal");

// Event listener for canceling deletion
cancelDeleteButton.addEventListener("click", () => {
  // Hide the modal when canceled
  deleteConfirmationModal.style.display = "none";
});

// Event listener for confirming the deletion and initiating the delete process
confirmDeleteButton.addEventListener("click", () => {
  const postId = deleteConfirmationModal.getAttribute("data-post-id");

  if (postId) {
    deletePost(postId);
  } else {
    throw new Error("postId is not defined or has an incorrect value.");
  }
  // Hide the modal when confirmed
  deleteConfirmationModal.style.display = "none";
});