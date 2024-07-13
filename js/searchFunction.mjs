import { fetchWithToken } from "./token.mjs";
import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { formatDateString } from "./dateFormat.mjs";

// Array to store fetched posts
let posts = [];

// URL to the fetch API
const API_URL = `${apiBaseUrl}${allPostsApi}?_author=true`;

/**
 * Renders all the posts in the selected container.
 *
 * @param {Object[]} posts An array of post objects to be rendered.
 * @example
 * Assume filteredPosts is an array of post objects obtained through some filtering mechanism.
 * renderPosts(filteredPosts);
 */
const renderPosts = (posts) => {
  const postsContainer = document.querySelector(".all-posts_card-container");
  postsContainer.innerHTML = "";

  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value;

  if (posts.length === 0) {
    // If no posts are found, display a message
    const noResultsMessage = document.createElement("p");
    noResultsMessage.className = "d-flex justify-content-center bold";
    noResultsMessage.innerText = `Search result "${searchTerm}" not found.`;
    postsContainer.appendChild(noResultsMessage);
  } else {
    // Render the posts
    posts.forEach((postData) => {
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
      cardPostContent.appendChild(cardPostImage);

      const cardPostTextContent = document.createElement("div");
      cardPostTextContent.className = "card-body py-2 px-3";
      cardPostContent.appendChild(cardPostTextContent);

      const cardPostTitle = document.createElement("h6");
      cardPostTitle.innerText = postData.title;
      cardPostTitle.className = "card-title";
      cardPostTextContent.appendChild(cardPostTitle);

      const userNameOnCardLayout = document.createElement("div");
      userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
      cardPostTextContent.appendChild(userNameOnCardLayout);

      const profileImageThumbnail = document.createElement("img");
      // Set the source (src) attribute of the image. Use the postData.author.avatar if it's truthy,
      // if not, use the fallback image "../images/no_avatar.jpg"
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

      postsContainer.appendChild(cardColLayout);
    });
  }
};

/**
 * Filters posts based on the provided search text and renders the filtered posts.
 *
 * @param {string} inputText The search text to filter posts.
 * @example
 * filterPosts(searchTerm);
 */
const filterPosts = (inputText) => {
  // Create a new array of posts that match the search criteria
  const filteredPosts = posts.filter((post) => {
    // Check if the lowercase version of post title/content/userName includes the lowercase search text
    const titleMatch = post.title.toLowerCase().includes(inputText.toLowerCase());
    const contentMatch = post.body?.toLowerCase().includes(inputText.toLowerCase());
    const userMatch = post.author.name.toLowerCase().includes(inputText.toLowerCase());
    // Return true if any of the conditions (title, content, or userName) are true
    return titleMatch || contentMatch || userMatch;
  });
  renderPosts(filteredPosts);
};

// Adds an event listener to the search form, preventing its default submission behavior.
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Extracts and trims the search term from the input field.
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    // If search term is empty, render all posts
    return renderPosts(posts);
  }

  // Call the filterPosts function with the search term
  filterPosts(searchTerm);
});

/**
 * Initializes the app by fetching posts and rendering them.
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */
const initialize = async () => {
  try {
    // Fetch posts from the API
    posts = await fetchWithToken(API_URL);
    // Render the fetched posts
    renderPosts(posts);
  } catch (error) {
    throw new Error("Error fetching posts:", error);
  }
};

// Call the initialize function to start the app
initialize();