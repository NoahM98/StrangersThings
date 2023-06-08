import { BASE_URL } from "./api-keys";

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    // You can log ▲▲▲ the result
    // here ▼▼▼ to view the json object before returning it
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
