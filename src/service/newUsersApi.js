export const fetchNewUsers = async (token, userId, body) => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/newUsers`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token,
      },
    });
    console.log(response)
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const newUsers = await response.json();
    console.log(newUsers);
    return newUsers;
  } catch (error) {
    console.log(error);
    return false;
  }
};
