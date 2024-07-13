import { formatDateString } from "./dateFormat.mjs";

/**
 * Renders all the posts in the selected container.
 *
 * @param {Object[]} posts An array of post objects to be rendered.
 * @example
 * Assume filteredPosts is an array of post objects obtained through some filtering mechanism.
 * renderPosts(filteredPosts);
 */

export const createCardElement = (posts) => {
  const postsContainer = document.querySelector(".all-posts_card-container");
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    // DISPLAY MESSAGE IF NO POSTS
    const noResultsMessage = document.createElement("p");
    noResultsMessage.className = "d-flex justify-content-center bold";
    noResultsMessage.innerText = `Search result "${searchTerm}" not found.`;
    postsContainer.appendChild(noResultsMessage);
  } else {
    // RENDER POSTS
    posts.forEach((postData) => {
      const cardColLayout = document.createElement("div");
      cardColLayout.className = "col-6 col-sm-6 col-md-4 col-lg-3";

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
      cardPostTitle.className = "card-title text-to-uppercase";
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

      postsContainer.appendChild(cardColLayout);
    });
  }
};