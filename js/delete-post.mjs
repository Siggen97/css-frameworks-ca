import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken, token } from "./token.mjs";

/**
 * Deletes a post by ID.
 * @param {string} postId - The ID of the post to delete.
 */
const deletePost = async (postId) => {
  try {
    await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Post is deleted!");
    window.location.href = "/profile/";
  } catch (error) {
    console.error("Error deleting post:", error);
    window.location.href = "/profile/";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const cancelDeleteButton = document.querySelector("#cancelDelete");
  const confirmDeleteButton = document.querySelector("#confirmDelete");
  const deleteConfirmationModal = document.querySelector("#deleteConfirmationModal");

  deleteButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const postId = event.target.getAttribute("data-post-id");
      deleteConfirmationModal.setAttribute("data-post-id", postId);
      deleteConfirmationModal.style.display = "block";
    });
  });

  cancelDeleteButton.addEventListener("click", () => {
    deleteConfirmationModal.style.display = "none";
  });

  confirmDeleteButton.addEventListener("click", () => {
    const postId = deleteConfirmationModal.getAttribute("data-post-id");
    if (postId) {
      deletePost(postId);
    } else {
      console.error("postId is not defined or has an incorrect value.");
    }
    deleteConfirmationModal.style.display = "none";
  });
});
