import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken } from "./token.mjs";

const deletePost = async (id) => {
  try {
    const response = await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("Post is deleted!");
      window.location.href = "/profile/";
    } else {
      throw new Error("Error deleting post:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const cancelDeleteButton = document.querySelector("#cancelDelete");
  const confirmDeleteButton = document.querySelector("#confirmDelete");
  const deleteConfirmationModal = document.querySelector("#deleteConfirmationModal");

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
