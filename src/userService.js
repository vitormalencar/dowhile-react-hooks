const BASEURL = "https://api.github.com/users/";

export const fetchGithubUser = (username) => {
  return fetch(`${BASEURL}${username}`).then((response) => {
    if (!response.ok) {
      return Promise.reject("User not found");
    }
    return response.json();
  });
};
