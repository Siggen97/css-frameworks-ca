import { fetchWithToken } from "./token.mjs";
import { apiBaseUrl, allPostsApi } from "./variables.mjs";

const API_URL = `${apiBaseUrl}${allPostsApi}?_author=true`;

export async function getPosts() {
  const posts = await fetchWithToken(API_URL);
  return Array.isArray(posts) ? posts : [];
}

export async function searchPosts(query) {
  const posts = await getPosts();
  return posts.filter(post => postContainsQuery(post, query));
}

export function postContainsQuery(post, query) {
  const titleMatches = post.title.toLowerCase().includes(query.toLowerCase());
  const bodyMatches = post.body.toLowerCase().includes(query.toLowerCase());
  const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
  return titleMatches || bodyMatches || tagsMatch;
}
