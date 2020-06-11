export const fetchUpdateUser = async (token, userId, body) => {
  console.log("body api" + body);
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}users/${userId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token
      },
      body: body
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const updatetedUser = await response.json();
    return updatetedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};
