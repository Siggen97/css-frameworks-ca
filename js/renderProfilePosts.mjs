import { apiBaseUrl, profileUrl } from "./variables.mjs";
import { fetchWithToken } from "./token.mjs";
import { createMessage } from "./error.mjs";
import { formatDateString } from "./dateFormat.mjs";

// Getting userData from localStorage
const user = JSON.parse(localStorage.getItem("userProfile"));

/**
 * Fetches the profile posts of the logged-in user.
 *
 * @returns {Promise<Object>} - A promise that resolves with the user's profile data and posts.
 */
const fetchUserProfilePosts = async () => {
  return await fetchWithToken(`${apiBaseUrl}${profileUrl}${user.name}?_author=true&_posts=true`);
};

/**
 * Creates an HTML card element for a single post.
 * @param {Object} postData The data for the post.
 * @returns {HTMLElement} The generated HTML card element.
 */
const createCardAllPosts = (postData) => {
  const cardColLayout = document.createElement("div");
  cardColLayout.className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3";

  const cardPostContent = document.createElement("a");
  cardPostContent.href = `../post/index.html?id=${postData.id}`;
  cardPostContent.className = "card h-100 my-3";
  cardColLayout.appendChild(cardPostContent);

  const cardPostImage = document.createElement("img");
  // Set the source (src) attribute of the image. Use the postData.media if it's truthy,
  // if not, use the fallback image "../images/no_img.jpg"
  cardPostImage.src = !!postData.media ? postData.media : "../images/no_img.jpg";
  cardPostImage.className = "card-img-top feed-card-img";
  cardPostImage.id = "cardPostImage";
  cardPostContent.appendChild(cardPostImage);

  const cardPostTextContent = document.createElement("div");
  cardPostTextContent.className = "card-body px-3 pt-3 pb-0";
  cardPostContent.appendChild(cardPostTextContent);

  const cardPostTitle = document.createElement("h5");
  cardPostTitle.innerText = postData.title;
  cardPostTitle.className = "card-title mb-2";
  cardPostTitle.id = "cardPostTitle";
  cardPostTextContent.appendChild(cardPostTitle);

  const userNameOnCardLayout = document.createElement("div");
  userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
  cardPostTextContent.appendChild(userNameOnCardLayout);

  const profileImageThumbnail = document.createElement("img");
  // Set the source (src) attribute of the image. Use the postData.author.avatar if it's truthy,
  // if not, use the fallback image "../images/no_avatar.jpg"
  profileImageThumbnail.src = !!postData.avatar ? postData.avatar : "../images/no_avatar.jpg";
  profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail";
  userNameOnCardLayout.appendChild(profileImageThumbnail);

  const userName = document.createElement("p");
  userName.innerText = postData.owner;
  userName.className = "mb-0";
  userName.id = "cardPostBody";
  userNameOnCardLayout.appendChild(userName);

  const cardFooterWrapper = document.createElement("div");
  cardFooterWrapper.className = "d-flex align-items-center justify-content-between p-3";
  cardPostContent.appendChild(cardFooterWrapper);

  const cardPostDatePublished = document.createElement("small");
  const formattedDate = formatDateString(postData.created);
  cardPostDatePublished.innerText = formattedDate;
  cardPostDatePublished.className = "text-secondary";
  cardFooterWrapper.appendChild(cardPostDatePublished);

  const sortByButtonWrapper = document.createElement("div");
  sortByButtonWrapper.className = "btn-group";
  cardFooterWrapper.appendChild(sortByButtonWrapper);

  const sortByButton = document.createElement("button");
  sortByButton.className = "btn btn-outline-secondary btn-sm dropdown-toggle d-flex align-items-center";
  sortByButton.type = "button";
  sortByButton.setAttribute("data-bs-toggle", "dropdown");
  sortByButton.setAttribute("aria-expanded", "false");
  sortByButtonWrapper.appendChild(sortByButton);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("fill", "currentColor");
  svg.classList = "bi bi-gear mr-2";
  svg.setAttribute("viewBox", "0 0 16 16");
  sortByButton.appendChild(svg);

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
  );
  svg.appendChild(path1);

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute(
    "d",
    "M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
  );
  svg.appendChild(path2);

  const dropDownMenu = document.createElement("div");
  dropDownMenu.className = "dropdown-menu";
  sortByButtonWrapper.appendChild(dropDownMenu);

  const dropDownItemEditPost = document.createElement("a");
  dropDownItemEditPost.className = "dropdown-item";
  dropDownItemEditPost.innerText = "Edit post";
  dropDownItemEditPost.id = "edit-post";

  const editPostUrl = `/post/edit.html?id=${postData.id}`;
  dropDownItemEditPost.href = editPostUrl;

  dropDownMenu.appendChild(dropDownItemEditPost);

  const dropDownItemDeletePost = document.createElement("a");
  dropDownItemDeletePost.className = "dropdown-item";
  dropDownItemDeletePost.innerText = "Delete post";
  dropDownItemDeletePost.id = "delete-post";
  dropDownItemDeletePost.href = "#";
  dropDownItemDeletePost.addEventListener("click", () => {
    deleteConfirmationModal.style.display = "block";
    deleteConfirmationModal.dataset.postId = postData.id;
  });
  dropDownMenu.appendChild(dropDownItemDeletePost);

  return cardColLayout;
};

// Targeting DOM elements
const loaderContainer = document.querySelector(".loader-container");
const userPostsContainer = document.querySelector(".user-posts_profile-page");
const errorMessage = createMessage("error");

// Flag to prevent multiple simultaneous loading requests
let loadingPosts = false;

/**
 * Displays post cards by fetching and rendering posts.
 *
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */
const displayAllPostsCards = async () => {
  try {
    // If posts are already being loaded, return
    if (loadingPosts) {
      return;
    }

    // Set loading flag to true
    loadingPosts = true;

    // Display loader while posts are being fetched
    loaderContainer.style.display = "block";

    // Fetch the user profile data and posts using the fetchUserProfilePosts function.
    const userObject = await fetchUserProfilePosts();

    // Clear the inner HTML of the userPostsContainer to prepare for displaying new posts.
    userPostsContainer.innerHTML = "";

    // Extract the posts array from the userObject, which contains the user's posts.
    const posts = userObject.posts;

    // Iterate over each post data and create a card for each post
    posts.forEach((postData) => {
      // Create a card element for the current post data
      const postCard = createCardAllPosts(postData);
      // Append the generated card to the container for all posts
      userPostsContainer.appendChild(postCard);
    });
  } catch (error) {
    // Display error message
    userPostsContainer.innerHTML = errorMessage;
    // Rethrow the error for external handling, if necessary
    throw new Error(error);
  } finally {
    // Reset loading flag and hide loader
    loadingPosts = false;
    loaderContainer.style.display = "none";
  }
};

// Initial call to display blog cards
displayAllPostsCards();