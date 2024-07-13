import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken } from "./token.mjs";
import { createMessage } from "./error.mjs";
import { formatDateString } from "./dateFormat.mjs";

/**
 * Fetches all posts with an access token
 * @returns {Promise} A promise representing the asynchronous operation of fetching posts.
 */
const fetchAllPosts = async () => {
  return await fetchWithToken(`${apiBaseUrl}${allPostsApi}?_author=true`);
};

/**
 * Creates an HTML card element.
 *
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

  cardPostImage.src = !!postData.media ? postData.media : "../images/no_img.jpg";
  cardPostImage.className = "card-img-top feed-card-img";
  cardPostContent.appendChild(cardPostImage);

  const cardPostTextContent = document.createElement("div");
  cardPostTextContent.className = "card-body py-2 px-3";
  cardPostContent.appendChild(cardPostTextContent);

  const cardPostTitle = document.createElement("h6");
  cardPostTitle.innerText = postData.title;
  cardPostTitle.className = "card-title my-3";
  cardPostTextContent.appendChild(cardPostTitle);

  const userNameOnCardLayout = document.createElement("div");
  userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
  cardPostTextContent.appendChild(userNameOnCardLayout);

  const profileImageThumbnail = document.createElement("img");

  profileImageThumbnail.src = !!postData.author.avatar ? postData.author.avatar : "../images/no_avatar.jpg";
  profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail";
  userNameOnCardLayout.appendChild(profileImageThumbnail);

  const userName = document.createElement("p");
  userName.innerText = postData.author.name;
  userName.className = "mb-0 d-flex align-items-center";
  userNameOnCardLayout.appendChild(userName);

  const cardPostDatePublishedWrapper = document.createElement("div");
  cardPostDatePublishedWrapper.className = "card-footer text-end";
  cardPostContent.appendChild(cardPostDatePublishedWrapper);

  const cardPostDatePublished = document.createElement("small");
  const formattedDate = formatDateString(postData.created);
  cardPostDatePublished.innerText = formattedDate;
  cardPostDatePublished.className = "text-secondary";
  cardPostDatePublishedWrapper.appendChild(cardPostDatePublished);

  return cardColLayout;
};

// GET ELEMENTS FROM DOM
const loaderContainer = document.querySelector(".loader-container");
const allPostsContainer = document.querySelector(".all-posts_card-container");
const errorMessage = createMessage("error");

// PREVENT MULTIPLE FETCHES
let loadingPosts = false;

/**
 * Displays post cards by fetching and rendering posts.
 *
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */

export const displayAllPostsCards = async () => {
  try {
    // RETURN IF ALREADY LOADING
    if (loadingPosts) {
      return;
    }

    // SET LOADING FLAG
    loadingPosts = true;

    // LOADER DISPLAY WHEN FETCHING
    loaderContainer.style.display = "block";

    // FETCH ALL POSTS
    const posts = await fetchAllPosts();

    // CLEAR EXISTING POSTS
    allPostsContainer.innerHTML = "";

    // CREATE CARDS FOR EACH POST
    posts.forEach((postData) => {
      // CARD ELEMENT
      const postCard = createCardAllPosts(postData);
        // APPEND CARD TO CONTAINER
      allPostsContainer.appendChild(postCard);
    });
  } catch (error) {
    allPostsContainer.innerHTML = errorMessage;
    // THROW ERROR
    throw new Error(error);
  } finally {
    // RESET LOADING FLAG
    loadingPosts = false;
    loaderContainer.style.display = "none";
  }
};

// CALL FUNCTION TO DISPLAY POSTS
displayAllPostsCards();