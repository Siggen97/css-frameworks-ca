import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { createMessage } from "./error.mjs";
import { formatDateString } from "./dateFormat.mjs";
import { fetchWithToken } from "./token.mjs";

// Extracting the post ID from the URL query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/**
 * Fetches a single post from the server with authentication.
 * @param {string} id The unique identifier of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the data of the fetched post.
 * @example
 * const singlePostData = await fetchSinglePost("123");
 */
const fetchSinglePost = async (id) => {
  return await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${id}?_author=true`);
};

/**
 * Creates an HTML card element for a single post.
 * @param {Object} postData The data for the post.
 * @returns {HTMLElement} The generated HTML card element.
 */
const createCardSinglePost = (postData) => {
  const cardColLayout = document.createElement("div");
  cardColLayout.className = "col-12";

  const cardPostContent = document.createElement("div");
  cardPostContent.className = "card mb-5";
  cardColLayout.appendChild(cardPostContent);

  if (postData.media) {
    const cardPostImage = document.createElement("img");
    // Set the source (src) attribute of the image. Use the postData.media if it's truthy,
    // if not, use the fallback image "../images/no_img.jpg"
    cardPostImage.src = postData.media ? postData.media : "../images/no_img.jpg";
    cardPostImage.className = "card-img-top single-post-img";
    cardPostContent.appendChild(cardPostImage);
  }

  const cardPostTextContent = document.createElement("div");
  cardPostTextContent.className = "card-body";
  cardPostContent.appendChild(cardPostTextContent);

  const userNameOnCardLayout = document.createElement("div");
  userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
  cardPostTextContent.appendChild(userNameOnCardLayout);

  const profileImageThumbnail = document.createElement("img");
  // Set the source (src) attribute of the image. Use the postData.author.avatar if it's truthy,
  // if not, use the fallback image "../images/no_avatar.jpg"
  profileImageThumbnail.src = postData.author.avatar ? postData.author.avatar : "../images/no_avatar.jpg";
  profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail";
  userNameOnCardLayout.appendChild(profileImageThumbnail);

  const userName = document.createElement("p");
  userName.innerText = postData.author.name;
  userName.className = "mb-0";
  userNameOnCardLayout.appendChild(userName);

  const cardPostTitle = document.createElement("h5");
  cardPostTitle.innerText = postData.title;
  cardPostTitle.className = "card-title mb-2 text-uppercase";
  cardPostTextContent.appendChild(cardPostTitle);

  const cardPostText = document.createElement("p");
  cardPostText.innerText = postData.body;
  cardPostText.className = "card-text";
  cardPostTextContent.appendChild(cardPostText);

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

// Targeting DOM elements
const loaderContainer = document.querySelector(".loader-container");
const singlePostContainer = document.querySelector("#post-single-container");
const errorMessage = createMessage("error");

/**
 * Displays a single blog post card.
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 * @example
 * await displaySinglePostCard();
 */
const displaySinglePostCard = async () => {
  try {
    // Fetch the specific post data using the provided ID
    const jsonSpecific = await fetchSinglePost(id);

    // Create a card element for the fetched post data
    const singlePostCard = createCardSinglePost(jsonSpecific);

    // Append the card to the container for the single post
    singlePostContainer.appendChild(singlePostCard);
  } catch (error) {
    // Display error message in case of an error
    singlePostContainer.innerHTML = errorMessage;

    // Rethrow the error for external handling, if necessary
    throw new Error(error);
  } finally {
    // Hide loader regardless of success or failure
    loaderContainer.style.display = "none";
  }
};

// Initial call to display the single post card
displaySinglePostCard();
