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

  if (!Array.isArray(posts)) {
    console.error("Expected an array of posts but received:", posts);
    return;
  }

  posts.forEach((postData) => {
    const cardColLayout = document.createElement("div");
    cardColLayout.className = "col-12 mb-3";

    const cardPostContent = document.createElement("a");
    cardPostContent.href = `../post/index.html?id=${postData.id}`;
    cardPostContent.className = "card h-100";
    cardColLayout.appendChild(cardPostContent);

    const cardPostTextContent = document.createElement("div");
    cardPostTextContent.className = "card-body py-2 px-3";
    cardPostContent.appendChild(cardPostTextContent);

    const userNameOnCardLayout = document.createElement("div");
    userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
    cardPostTextContent.appendChild(userNameOnCardLayout);

    const profileImageThumbnail = document.createElement("img");
    profileImageThumbnail.src = postData.author.avatar || "../images/no_avatar.jpg";
    profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail";
    userNameOnCardLayout.appendChild(profileImageThumbnail);

    const userName = document.createElement("p");
    userName.innerText = postData.author.name;
    userName.className = "mb-0";
    userNameOnCardLayout.appendChild(userName);

    const cardPostTitle = document.createElement("h6");
    cardPostTitle.innerText = postData.title;
    cardPostTitle.className = "card-title text-uppercase mt-2";
    cardPostTextContent.appendChild(cardPostTitle);

    const cardPostBody = document.createElement("p");
    cardPostBody.innerText = postData.body;
    cardPostTextContent.appendChild(cardPostBody);

    if (postData.media) {
      const cardPostImage = document.createElement("img");
      cardPostImage.src = postData.media;
      cardPostImage.className = "card-img-top feed-card-img";
      cardPostContent.appendChild(cardPostImage);
    }

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
};
