/**
 * This will save the accessToken to the localStorage.
 * The token is used to access information on the site and be able to create/update/delete posts.
 * @param {*} key the key of access token
 * @param {*} value the value of the access token
 */
export function save(key, value) {
  localStorage.setItem(key, value);
}

/**
 * This will save the hole user response to the localStorage.
 * The token is used to access information on the site and be able to create/update/delete posts.
 * @param {*} key the key of access token
 * @param {*} value the value of the access token
 */
export function save2(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
