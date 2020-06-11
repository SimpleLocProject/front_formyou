export const getUserSessions = async () => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/v1/usersessions`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const userSessions = await response.json();
    return userSessions;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createUserSession = async (session_id, user_id, token) => {
  console.log(session_id, user_id, token);
  const API_URL = process.env.REACT_APP_API_URL;
  const data = {
    usersession: {
      student_id: user_id,
      session_id,
    },
  };
  try {
    const response = await fetch(`${API_URL}/api/v1/usersessions`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const session = await response.json();
    return session;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const destroyUserSession = async (user_session, token) => {
  const API_URL = process.env.REACT_APP_API_URL;
  console.log("dans mon api", user_session.id);
  console.log(token);
  try {
    const response = await fetch(
      `${API_URL}/api/v1/usersessions/${user_session.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const session = await response.json();
    return session;
  } catch (error) {
    console.log(error);
    return false;
  }
};
